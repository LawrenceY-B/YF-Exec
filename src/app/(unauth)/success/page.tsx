"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  const handleNewRegistration = () => {
    router.push("/camp-registration");
  };

  return (
    <div className="flex h-fit items-center justify-center">
      <div className="no-scrollbar flex max-w-md flex-col items-center justify-center space-y-4 overflow-x-hidden rounded-2xl bg-[var(--background)] p-3.5 shadow-md">
        <div className="mb-2 flex justify-center">
          <CheckCircle2 className="h-12 w-12 text-green-500" />
        </div>

        <h1 className="text-center text-xl font-bold text-gray-900">Registration Successful!</h1>

        <p className="text-center text-xs text-gray-600 sm:text-sm">
          Thank you for registering for the camp. Your application has been submitted successfully. You will receive an
          sms confirmation shortly with further details.
        </p>

        <div className="mt-6">
          <Button onClick={handleNewRegistration} className="w-full cursor-pointer" size="lg">
            Register Another Person
          </Button>
        </div>
      </div>
    </div>
  );
}
