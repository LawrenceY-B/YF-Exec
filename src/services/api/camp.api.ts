import { IGetQuestionsResponse } from "@/models/camp-form";

const getCampYear = () => {
  const currentYear = new Date().getFullYear();
  return currentYear + 1;
};
export default async function getQuestions(): Promise<
  IGetQuestionsResponse | never
> {
  try {
    const campYear = getCampYear() + 1;
    const res = await fetch(
      `http://localhost:8080/api/camp/get-questions/${campYear}/camp-registration`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!res.ok) {
      throw new Error("Failed to fetch camp questions");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching camp questions:", error);
    throw error;
  }
}
