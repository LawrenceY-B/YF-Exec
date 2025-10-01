"use client";

import { ErrorDialog } from "@/components/dialogs/error-dialog";
import { Separator } from "@/components/ui/separator";
import { useCampStore } from "@/store/camp.store";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CampRegistrationContent() {
  const { campQuestionData, loading, error, fetchCampQuestions } =
    useCampStore();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchCampQuestions();
  }, [fetchCampQuestions]);

  useEffect(() => {
    if (error || !campQuestionData) {
      setOpen(true);
    }
  }, [error, campQuestionData]);

  if (loading) {
    return <div className="flex">Loading...</div>;
  }

  if (error || !campQuestionData) {
    return (
      <ErrorDialog
        open={open}
        onOpenChange={setOpen}
        title={error || "Failed to load camp registration form"}
        description="Please try again later or contact support if the issue persists."
        onRetry={fetchCampQuestions}
        retryText="Try Again"
        cancelText="Cancel"
      />
    );
  }

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
            {campQuestionData?.formTitle}
          </h1>
        </span>
      </nav>

      <main className="bg-[var(--background)] no-scrollbar rounded-2xl grid sm:grid-cols-[30%_1fr] lg:grid-cols-[20%_1fr] p-1 sm:p-4 h-screen w-full flex-col overflow-x-hidden shadow-md">
        <div>Stepper goes here</div>
        <section>
          <h1 className="text-xl font-bold">{campQuestionData?.formTitle}</h1>
          <p className="">{campQuestionData?.description}</p>
          <Separator className="my-4" />
          {campQuestionData?.sections.map((section) => (
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
