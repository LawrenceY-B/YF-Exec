import { CampForm } from "@/models/camp-form";
import { z } from "zod";

export default function generateZodSchema(config: CampForm | null) {
  if (!config) {
    console.error("No config provided, returning demo schema");
    return z.object({
      timestamp: z.string().min(1, "Timestamp is required"),
    });
  }
  const schemaObject: Record<string, z.ZodTypeAny> = {};

  schemaObject.timestamp = z.string().min(1, "Timestamp is required");

  config.sections.forEach((section) => {
    section.fields.forEach((field) => {
      if (field.id === "timestamp") return;

      let fieldSchema: z.ZodTypeAny;

      switch (field.type) {
        case "text":
        case "textarea":
          fieldSchema = z.string();
          break;

        case "email":
          fieldSchema = z.string();
          break;

        case "tel":
          fieldSchema = z.string();
          break;

        case "number":
          fieldSchema = z.string();
          break;

        case "date":
        case "datetime":
          fieldSchema = z.string();
          break;

        case "radio":
          fieldSchema =
            field.options && field.options.length > 0 ? z.enum(field.options as [string, ...string[]]) : z.string();
          break;

        case "multiselect":
        case "checkbox":
          fieldSchema = field.required
            ? z.array(z.string()).min(1, `${field.label} is required`)
            : z.array(z.string()).optional().default([]);
          break;

        default:
          fieldSchema = z.string();
      }

      if (field.required && field.type !== "multiselect" && field.type !== "checkbox") {
        if (field.type === "number") {
          fieldSchema = z
            .string()
            .min(1, `${field.label} is required`)
            .refine((val) => !isNaN(Number(val)), {
              message: `${field.label} must be a number`,
            })
            .transform((val) => Number(val));
        } else if (field.type === "email") {
          fieldSchema = z.string().min(1, `${field.label} is required`).email("Please enter a valid email address");
        } else if (field.type === "tel") {
          fieldSchema = z
            .string()
            .min(1, `${field.label} is required`)
            .regex(/^[0-9+\-() ]+$/, "Please enter a valid phone number");
        } else if (field.type === "date" || field.type === "datetime") {
          fieldSchema = z
            .string()
            .min(1, `${field.label} is required`)
            .refine((val) => !isNaN(Date.parse(val)), {
              message: `${field.label} must be a valid date`,
            });
        } else {
          fieldSchema = z.string().min(1, `${field.label} is required`);
        }
      } else if (field.type !== "multiselect" && field.type !== "checkbox") {
        fieldSchema = fieldSchema.optional().or(z.literal(""));
      }

      schemaObject[field.id] = fieldSchema;
    });
  });

  const finalSchema = z.object(schemaObject);
  return finalSchema;
}
