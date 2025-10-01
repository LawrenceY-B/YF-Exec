import { Suspense } from "react";
import CampRegistrationContent from "./_components/CampRegistrationContent";

export async function generateMetadata() {
  return {
    title: "LIC Camp Registration",
    description:
      "Register for the Legon Interdenominational Church Youth Camp, a transformative experience",
  };
}

export default function CampQuestion() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <CampRegistrationContent />
    </Suspense>
  );
}
