import { ICampRegistration, IGetQuestionsResponse } from "@/models/camp-form";

const getCampYear = () => {
  const currentYear = new Date().getFullYear();
  return currentYear + 1;
};

export default async function getQuestions(): Promise<IGetQuestionsResponse | never> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      throw new Error("API URL is not defined");
    }
    const campYear = getCampYear();
    const res = await fetch(`${apiUrl}/camp/get-questions/${campYear}/camp-registration`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch camp questions");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching camp questions:", error);
    throw error;
  }
}

export async function submitCampRegistration(
  data: ICampRegistration
): Promise<{ success: boolean; message: string; responseCode: string } | never> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      throw new Error("API URL is not defined");
    }

    const res = await fetch(`${apiUrl}/camp/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to submit camp registration");
    }

    return res.json();
  } catch (error) {
    console.error("Error submitting camp registration:", error);
    throw error;
  }
}
