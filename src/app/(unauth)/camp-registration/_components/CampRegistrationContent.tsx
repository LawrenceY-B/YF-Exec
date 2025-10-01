"use client";

import { Separator } from "@/components/ui/separator";
import getQuestions from "@/services/api/camp";
import { IGetQuestionsResponse } from "@/models/camp-form";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CampRegistrationContent() {
  const [questionsData, setQuestionsData] =
    useState<IGetQuestionsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        const questions = await getQuestions();

        if (questions.responseCode !== "000") {
          toast.error(questions.message);
          setError(questions.message);
          return;
        }

        setQuestionsData(questions);
        console.log(questions.data);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to load camp registration";
        toast.error(errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error || !questionsData) {
    return (
      <div className="flex h-screen w-screen items-center justify-center flex-col gap-4">
        <div className="text-red-500 text-center">
          <h2 className="text-xl font-bold mb-2">Error Loading Registration</h2>
          <p>{error || "Failed to load camp registration form"}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  const formData = questionsData.data;

  return (
    <>
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
            {formData.formTitle}
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
    </>
  );
}
