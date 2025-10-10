"use client";

import CampStepper from "@/components/camp-stepper";
import { ErrorDialog } from "@/components/dialogs/error-dialog";
import { Separator } from "@/components/ui/separator";
import { CampFormProvider } from "@/services/context/camp-form.context";
import { useCampStepperStore } from "@/store/camp-stepper.store";
import { useCampStore } from "@/store/camp.store";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CampForm from "./CampForm";

export default function CampRegistrationContent() {
  const { campQuestionData, loading, error, fetchCampQuestions } = useCampStore();
  const { currentSection, setCurrentSection } = useCampStepperStore();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchCampQuestions();
  }, [fetchCampQuestions]);

  useEffect(() => {
    if (campQuestionData && !currentSection) {
      setCurrentSection();
    }
  }, [campQuestionData, currentSection, setCurrentSection]);

  useEffect(() => {
    if (error || !campQuestionData) {
      setOpen(true);
    }
  }, [error, campQuestionData]);

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
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
          <h1 className="text-sm font-bold sm:text-lg md:text-xl">LIC Youth Fellowship</h1>
        </span>
      </nav>

      <main className="no-scrollbar flex w-full flex-col gap-4 overflow-x-hidden rounded-2xl bg-[var(--background)] p-3.5 shadow-md sm:grid sm:grid-cols-[40%_1fr] sm:p-4 lg:grid-cols-[30%_1fr]">
        <CampStepper />
        <section>
          <h1 className="text-xl font-bold">{campQuestionData?.formTitle}</h1>
          <p className="">{campQuestionData?.description}</p>
          <Separator className="my-4" />
          {currentSection ? (
            <CampFormProvider>
              <h2 className="mb-2 text-lg font-semibold">{currentSection.title}</h2>
              <p className="mb-4">{currentSection.description}</p>
              <Separator className="my-4" />
              <CampForm />
            </CampFormProvider>
          ) : (
            <div>Select a section to begin the registration process.</div>
          )}
        </section>
      </main>
    </>
  );
}
