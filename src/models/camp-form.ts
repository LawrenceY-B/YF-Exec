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
  type: "text" | "email" | "tel" | "number" | "date" | "datetime" | "textarea" | "radio" | "multiselect" | "checkbox";
  required?: boolean;
  options?: string[];
  description?: string;
  link?: string;
}

export interface ICampRegistration {
  formId: string;
  year: number;
  details: Details;
}

export interface Details {
  firstName: string;
  surname: string;
  otherNames: string;
  gender: string;
  age: number;
  phoneNumber: string;
  whatsappNumber: string;
  dob: string;
  email: string;
  firstTime: string;
  availability: string[];
  conditions: string;
  allergies: string;
  emergencyName: string;
  emergencyRelation: string;
  emergencyContact: string;
  expectation: string;
  bibleQuestion: string;
  homeChurch: string;
  occupation: string;
  workplace: string;
  residence: string;
  cellGroup: string[];
  bibleStudyGroupName: string;
  careCellGroupName: string;
  areaFellowshipName: string;
  isMember: string;
  declaration: string[];
  comments: string;
  support: string;
  supportAmount: string;
  whatsappGroup: string;
}
