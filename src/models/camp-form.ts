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
  timestamp: string;
  firstName: string;
  surname: string;
  otherNames: string;
  gender: string;
  dob: string;
  age: number;
  phoneNumber: string;
  whatsappNumber: string;
  email: string;
  firstTime: string;
  availability: string[];
  conditions: string;
  conditionDetails: string;
  allergies: string;
  allergyDetails: string;
  emergencyName: string;
  emergencyRelation: string;
  emergencyContact: string;
  expectation: string;
  bibleQuestion: string;
  homeChurch: string;
  otherChurch: string;
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

export enum CELL_GROUP {
  BIBLE_STUDY = "Bible Study",
  CARE_CELL = "Care Cell",
  AREA_FELLOWSHIP = "Area Fellowship",
}

export enum YES_NO_OPTIONS {
  YES = "Yes",
  NO = "No",
}
export enum IS_LIC_MEMBER {
  LIC = "LIC",
  OTHER_CHURCH = "Other",
}
