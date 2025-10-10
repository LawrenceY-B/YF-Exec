"use client";

import AnimatedBackground from "./camp-registration/_components/AnimatedBackground";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <>
      <AnimatedBackground />
      <main className="flex min-h-screen flex-col">
        <div className="flex flex-1 flex-col items-center pt-8 pb-20 sm:pt-2 sm:pb-2">
          <div className="container mx-auto flex flex-1 flex-col px-6 md:px-12 lg:px-26 [&_p]:my-1">
            {props.children}
          </div>
        </div>
      </main>
    </>
  );
}
