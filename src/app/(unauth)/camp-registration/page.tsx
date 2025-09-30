import { Separator } from "@/components/ui/separator";
import { IGetQuestionsResponse } from "@/models/camp-form";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { toast } from "sonner";

export async function generateMetadata() {
  return {
    title: "LIC Camp Registration",
    description:
      "Register for the Legon Interdenominational Church Youth Camp, a transformative experience",
  };
}
const getCampYear = () => {
  const currentYear = new Date().getFullYear();
  return currentYear + 1;
};
async function getQuestions(): Promise<IGetQuestionsResponse | never> {
  try {
    const campYear = getCampYear();
    const res = await fetch(
      `http://localhost:8080/api/camp/get-questions/${campYear}/camp-registration`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      toast.error("Failed to fetch camp questions");
      throw new Error("Failed to fetch camp questions");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching camp questions:", error);
    toast.error("Error fetching camp questions");
    throw error;
  }
}

export default async function CampQuestion() {
  const questions = await getQuestions();
  const formData = questions.data;
  if (questions.responseCode !== "000") {
    toast.error(questions.message);
    throw new Error(questions.message);
  }
  console.log(questions.data);

  return (
    <>
      <Suspense
        fallback={
          <div className="flex h-screen w-screen items-center justify-center">
            Loading...
          </div>
        }
      >
        <nav className="mb-4 flex items-center justify-center gap-2">
          <Link href="https://licfamily.org.gh/" target="_blank">
            <Image
              className="mx-auto mt-2"
              src="/images/logo.png"
              alt="Legon Interdenominational Church Logo"
              width={60}
              height={60}
            />
          </Link>
          <span className="flex flex-col items-start">
            <h1 className="text-base sm:text-lg md:text-xl font-bold">
              {questions.data.formTitle}
            </h1>
          </span>
        </nav>

        <main className="bg-[var(--background)] no-scrollbar rounded-2xl grid sm:grid-cols-[30%_1fr] lg:grid-cols-[20%_1fr] p-1 sm:p-4 h-screen w-full flex-col overflow-x-hidden shadow-md">
          <div>Stepper goes here</div>
          <section>
            <h1 className="text-xl font-bold">{formData.formTitle}</h1>
            <p className="">{formData.description}</p>
            <Separator className="my-4" />
            {formData.sections.map((section) => (
              <div key={section.id}>
                <h2 className="text-md font-medium">{section.title}</h2>
                <p className="text-sm italic">{section.description}</p>
              </div>
            ))}
          </section>
        </main>
      </Suspense>
    </>
  );
}
