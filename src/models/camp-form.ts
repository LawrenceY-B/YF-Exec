export interface IGetQuestionsResponse {
  success: boolean;
  responseCode: string;
  message: string;
  data: CampForm;
}

export interface CampForm {
  year: number;
  formId: string;
  formTitle: string;
  description: string;
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  description: string;
  fields: Field[];
}

export interface Field {
  id: string;
  label: string;
  type:
    | "text"
    | "email"
    | "tel"
    | "number"
    | "date"
    | "datetime"
    | "textarea"
    | "radio"
    | "multiselect"
    | "checkbox";
  required?: boolean;
  options?: string[];
  description?: string;
  link?: string;
}
