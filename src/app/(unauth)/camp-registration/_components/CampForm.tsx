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
import { Details, Field } from "@/models/camp-form";
import { useCampContext } from "@/services/context/camp-form.context";
import { useCampStepperStore } from "@/store/camp-stepper.store";
import { useCampStore } from "@/store/camp.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

  const renderField = useCallback(
    (field: Field) => {
      const fieldName = field.id;

      if (fieldName === "timestamp") {
        return null;
      }

      switch (field.type) {
        case "text":
        case "email":
          return (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName}
              render={({ field: formField }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel className="text-left" htmlFor={`input-${fieldName}`}>
                    {field.label}
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
          return (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName}
              render={({ field: formField }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel className="text-left" htmlFor={`number-${fieldName}`}>
                    {field.label}
                  </FormLabel>
                  <FormControl className="w-full">
                    <Input
                      type="number"
                      id={`number-${fieldName}`}
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

        case "date":
          return (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName}
              render={({ field: formField }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel className="text-left">{field.label}</FormLabel>
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
                  <FormLabel className="text-left">{field.label}</FormLabel>
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
                  <FormLabel className="text-left">{field.label}</FormLabel>
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
                  <FormLabel className="text-left">{field.label}</FormLabel>
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
    [form.control]
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
        className="flex flex-col items-start space-y-8"
        id="camp-registration-form"
      >
        {currentSection.fields.map((field) => (
          <div key={field.id} className="w-full">
            {renderField(field)}
          </div>
        ))}
        <Button type="submit" className="w-full">
          {currentStep < totalSteps - 1 ? "Next" : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
