"use client";
import { PhoneInput } from "@/components/form/phone-input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import generateZodSchema from "@/lib/form-schema-generator";
import { cn } from "@/lib/utils";
import { CELL_GROUP, Details, Field } from "@/models/camp-form";
import { useCampContext } from "@/services/context/camp-form.context";
import { useCampStepperStore } from "@/store/camp-stepper.store";
import { useCampStore } from "@/store/camp.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

//calculate age from date of birth
export const calculateAge = (dateOfBirth: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - dateOfBirth.getFullYear();
  const monthDiff = today.getMonth() - dateOfBirth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
    age--;
  }
  return age;
};

export default function CampForm() {
  const { campQuestionData } = useCampStore();
  const { updateFormData, submitForm } = useCampContext();
  const { currentStep, totalSteps, nextStep } = useCampStepperStore();

  type FormData = z.infer<ReturnType<typeof generateZodSchema>>;

  const schema = useMemo(() => {
    if (!campQuestionData?.sections?.[currentStep]) {
      return generateZodSchema(campQuestionData);
    }

    const currentSectionData = {
      ...campQuestionData,
      sections: [campQuestionData.sections[currentStep]],
    };

    return generateZodSchema(currentSectionData);
  }, [campQuestionData, currentStep]);

  const defaultValues = useMemo(() => {
    if (!campQuestionData?.sections?.[currentStep]) {
      return { timestamp: new Date().toISOString() };
    }

    const defaults: Record<string, string | string[]> = {
      timestamp: new Date().toISOString(),
    };

    const currentSection = campQuestionData.sections[currentStep];
    currentSection.fields?.forEach((field) => {
      if (field.id === "timestamp") return;

      if (field.type === "multiselect" || field.type === "checkbox") {
        defaults[field.id] = [];
      } else {
        defaults[field.id] = "";
      }
    });

    return defaults;
  }, [campQuestionData, currentStep]);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const dobField = form.watch("dob");
  const allergiesField = form.watch("allergies");
  const conditionsField = form.watch("conditions");
  const cellGroupField = form.watch("cellGroup");
  const homeChurchField = form.watch("homeChurch");

  const [hideAllergyDetails, setHideAllergyDetails] = useState(true);
  const [hideConditionDetails, setHideConditionDetails] = useState(true);
  const [hideCellGroupDetails, setHideCellGroupDetails] = useState<Record<CELL_GROUP, boolean> | null>(null);
  const [hideOtherChurchDetails, setHideOtherChurchDetails] = useState(true);

  useEffect(() => {
    if (dobField && typeof dobField === "string" && dobField.trim() !== "") {
      try {
        const age = calculateAge(new Date(dobField));
        const currentAge = form.getValues("age");
        if (currentAge !== age.toString()) {
          form.setValue("age", age.toString());
        }
      } catch (error) {
        console.error("Error calculating age:", error);
      }
    }

    if (allergiesField === "Yes") {
      setHideAllergyDetails(false);
      const allergyDetails = form.getValues("allergyDetails");
      if (!allergyDetails || (typeof allergyDetails === "string" && allergyDetails.trim() === "")) {
        form.setValue("allergyDetails", "");
      }
    } else {
      setHideAllergyDetails(true);
      form.setValue("allergyDetails", "");
    }

    if (conditionsField === "Yes") {
      setHideConditionDetails(false);
    } else {
      setHideConditionDetails(true);
      form.setValue("conditions", "");
    }

    if (homeChurchField === "Other") {
      setHideOtherChurchDetails(false);
    } else {
      setHideOtherChurchDetails(true);
      form.setValue("otherChurch", "");
    }
    const cellGroupFieldMapping = {
      [CELL_GROUP.BIBLE_STUDY]: "bibleStudyGroupName",
      [CELL_GROUP.CARE_CELL]: "careCellGroupName",
      [CELL_GROUP.AREA_FELLOWSHIP]: "areaFellowshipName",
    } as const;

    const hasSelectedCellGroups = cellGroupField && Array.isArray(cellGroupField) && cellGroupField.length > 0;

    const newHideState: Record<CELL_GROUP, boolean> = {
      [CELL_GROUP.BIBLE_STUDY]: !hasSelectedCellGroups || !cellGroupField.includes(CELL_GROUP.BIBLE_STUDY),
      [CELL_GROUP.CARE_CELL]: !hasSelectedCellGroups || !cellGroupField.includes(CELL_GROUP.CARE_CELL),
      [CELL_GROUP.AREA_FELLOWSHIP]: !hasSelectedCellGroups || !cellGroupField.includes(CELL_GROUP.AREA_FELLOWSHIP),
    };

    setHideCellGroupDetails(newHideState);

    Object.entries(cellGroupFieldMapping).forEach(([group, fieldKey]) => {
      if (newHideState[group as CELL_GROUP]) {
        form.setValue(fieldKey, "");
      }
    });
  }, [dobField, allergiesField, conditionsField, cellGroupField, homeChurchField, form]);

  const renderField = useCallback(
    (field: Field) => {
      const fieldName = field.id;
      const isFieldRequired = field.required;

      if (fieldName === "timestamp") {
        return null;
      }

      switch (field.type) {
        case "text":
        case "email":
          const shouldHideTextField =
            (fieldName === "allergyDetails" && hideAllergyDetails) ||
            (fieldName === "conditionDetails" && hideConditionDetails) ||
            (fieldName === "otherChurch" && hideOtherChurchDetails) ||
            (fieldName === "bibleStudyGroupName" && hideCellGroupDetails?.[CELL_GROUP.BIBLE_STUDY]) ||
            (fieldName === "careCellGroupName" && hideCellGroupDetails?.[CELL_GROUP.CARE_CELL]) ||
            (fieldName === "areaFellowshipName" && hideCellGroupDetails?.[CELL_GROUP.AREA_FELLOWSHIP]);

          if (shouldHideTextField) {
            return null;
          }

          const isTextFieldRequired =
            fieldName === "allergyDetails" ||
            fieldName === "conditionDetails" ||
            fieldName === "otherChurch" ||
            fieldName === "bibleStudyGroupName" ||
            fieldName === "careCellGroupName" ||
            fieldName === "areaFellowshipName";

          return (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName}
              render={({ field: formField }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel className="text-left" htmlFor={`input-${fieldName}`}>
                    {field.label}
                    {isTextFieldRequired || isFieldRequired ? <span className="text-red-500">*</span> : null}
                  </FormLabel>
                  <FormControl className="w-full">
                    <Input
                      id={`input-${fieldName}`}
                      type={field.type}
                      placeholder={field.description || `Enter ${field.label.toLowerCase()}`}
                      {...formField}
                      value={formField.value as string}
                    />
                  </FormControl>
                  {field.description && <FormDescription className="text-left">{field.description}</FormDescription>}
                  <FormMessage />
                </FormItem>
              )}
            />
          );

        case "tel":
          return (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName}
              render={({ field: formField }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel className="text-left" htmlFor={`tel-${fieldName}`}>
                    {field.label}
                    {isFieldRequired ? <span className="text-red-500">*</span> : null}
                  </FormLabel>
                  <FormControl className="w-full">
                    <PhoneInput
                      id={`tel-${fieldName}`}
                      placeholder={field.description || "Enter phone number"}
                      value={formField.value as string}
                      onChange={formField.onChange}
                      onBlur={formField.onBlur}
                      name={formField.name}
                    />
                  </FormControl>
                  {field.description && <FormDescription className="text-left">{field.description}</FormDescription>}
                  <FormMessage />
                </FormItem>
              )}
            />
          );

        case "textarea":
          return (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName}
              render={({ field: formField }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel className="text-left" htmlFor={`textarea-${fieldName}`}>
                    {field.label}
                    {isFieldRequired ? <span className="text-red-500">*</span> : null}
                  </FormLabel>
                  <FormControl className="w-full">
                    <Textarea
                      id={`textarea-${fieldName}`}
                      placeholder={field.description || `Enter ${field.label.toLowerCase()}`}
                      {...formField}
                      value={formField.value as string}
                    />
                  </FormControl>
                  {field.description && <FormDescription className="text-left">{field.description}</FormDescription>}
                  <FormMessage />
                </FormItem>
              )}
            />
          );

        case "number":
          const isAgeField = fieldName === "age";
          const hasDobInSection = campQuestionData?.sections?.some((section) =>
            section.fields.some((f) => f.id === "dob")
          );
          const isCalculatedAge = isAgeField && hasDobInSection;

          return (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName}
              render={({ field: formField }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel className="text-left" htmlFor={`number-${fieldName}`}>
                    {field.label}
                    {isFieldRequired ? <span className="text-red-500">*</span> : null}
                  </FormLabel>
                  <FormControl className="w-full">
                    <Input
                      type="number"
                      id={`number-${fieldName}`}
                      placeholder={field.description || `Enter ${field.label.toLowerCase()}`}
                      {...formField}
                      value={formField.value as string}
                      readOnly={isCalculatedAge}
                      className={cn(isCalculatedAge && "bg-muted cursor-not-allowed")}
                    />
                  </FormControl>
                  {field.description && <FormDescription className="text-left">{field.description}</FormDescription>}
                  {isCalculatedAge && (
                    <FormDescription className="text-left text-xs">
                      This field is automatically calculated from your date of birth
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          );

        case "date":
          return (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName}
              render={({ field: formField }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel className="text-left">
                    {field.label}
                    {isFieldRequired ? <span className="text-red-500">*</span> : null}
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !formField.value && "text-muted-foreground"
                          )}
                        >
                          {formField.value ? (
                            format(new Date(formField.value as string), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formField.value ? new Date(formField.value as string) : undefined}
                        onSelect={(date) => formField.onChange(date?.toISOString())}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  {field.description && <FormDescription className="text-left">{field.description}</FormDescription>}
                  <FormMessage />
                </FormItem>
              )}
            />
          );

        case "radio":
          return (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName}
              render={({ field: formField }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-left">
                    {field.label} {isFieldRequired ? <span className="text-red-500">*</span> : null}
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={formField.onChange}
                      value={formField.value as string}
                      className="flex flex-col space-y-1"
                    >
                      {field.options?.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`${fieldName}-${option}`} />
                          <label htmlFor={`${fieldName}-${option}`} className="cursor-pointer text-sm font-normal">
                            {option}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  {field.description && <FormDescription className="text-left">{field.description}</FormDescription>}
                  <FormMessage />
                </FormItem>
              )}
            />
          );

        case "checkbox":
        case "multiselect":
          return (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName}
              render={({ field: formField }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-left">
                    {field.label} {isFieldRequired ? <span className="text-red-500">*</span> : null}
                  </FormLabel>
                  <FormControl>
                    <div className="flex flex-col space-y-2">
                      {field.options?.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox
                            checked={(formField.value as string[])?.includes(option) || false}
                            id={`multiselect-${fieldName}-${option}`}
                            onCheckedChange={(checked) => {
                              const currentValues = (formField.value as string[]) || [];
                              return checked
                                ? formField.onChange([...currentValues, option])
                                : formField.onChange(currentValues.filter((value: string) => value !== option));
                            }}
                          />
                          <FormLabel className="text-sm font-normal" htmlFor={`multiselect-${fieldName}-${option}`}>
                            {option}
                          </FormLabel>
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  {field.description && <FormDescription className="text-left">{field.description}</FormDescription>}
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        default:
          return (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName}
              render={({ field: formField }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel className="text-left">
                    {field.label} {isFieldRequired ? <span className="text-red-500">*</span> : null}
                  </FormLabel>
                  <FormControl className="w-full">
                    <Input
                      placeholder={field.description || `Enter ${field.label.toLowerCase()}`}
                      {...formField}
                      value={formField.value as string}
                    />
                  </FormControl>
                  {field.description && <FormDescription className="text-left">{field.description}</FormDescription>}
                  <FormMessage />
                </FormItem>
              )}
            />
          );
      }
    },
    [
      form.control,
      campQuestionData?.sections,
      hideAllergyDetails,
      hideConditionDetails,
      hideOtherChurchDetails,
      hideCellGroupDetails,
    ]
  );

  if (!campQuestionData) {
    return <div>No form data available</div>;
  }
  const currentSection = campQuestionData.sections[currentStep];

  if (!currentSection) {
    return <div>Invalid step</div>;
  }

  const onSubmit = (data: FormData) => {
    if (currentStep < totalSteps - 1) {
      updateFormData(data as Partial<Details>);
      nextStep();
    } else {
      submitForm();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-start gap-5"
        id="camp-registration-form"
      >
        {currentSection.fields.map((field) => {
          const renderedField = renderField(field);
          if (!renderedField) return null;

          return (
            <div key={field.id} className="w-full">
              {renderedField}
            </div>
          );
        })}
        <Button type="submit" className="w-full">
          {currentStep < totalSteps - 1 ? "Next" : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
