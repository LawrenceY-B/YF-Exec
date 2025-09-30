"use client";

import AnimatedBackground from "./camp-registration/_components/AnimatedBackground";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <>
      <AnimatedBackground />
      <main className="flex min-h-screen flex-col">
        <div className="flex flex-1 flex-col items-center">
          <div className="container mx-auto flex flex-1 flex-col p-6 lg:px-26 md:px-12 [&_p]:my-1">
            {props.children}
          </div>
        </div>
      </main>
    </>
  );
}
