import React from "react";

export default function AnimatedBackground() {
  return (
    <div className="fixed top-0 w-full h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-30 to-emerald-25 dark:from-slate-900 dark:via-blue-950 dark:to-emerald-950 -z-20">
      {/* Animated gradient orbs - themed for light/dark mode */}
      <div className="absolute top-0 left-1/6 w-80 h-80 bg-blue-200 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 dark:opacity-30 animate-blob"></div>
      <div className="absolute top-16 right-1/6 w-96 h-96 bg-cyan-200 dark:bg-cyan-400 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-35 dark:opacity-25 animate-blob animation-delay-2000"></div>
      <div className="absolute top-8 left-1/2 w-72 h-72 bg-emerald-200 dark:bg-emerald-400 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 dark:opacity-20 animate-blob animation-delay-4000"></div>
      <div className="absolute top-20 right-1/3 w-64 h-64 bg-sky-200 dark:bg-sky-400 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-25 dark:opacity-15 animate-blob animation-delay-6000"></div>

      {/* Themed glow at top */}
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-blue-100/20 via-cyan-50/10 to-transparent dark:from-blue-800/15 dark:via-cyan-900/8 dark:to-transparent"></div>

      {/* Grid pattern overlay with gradient fade */}
      <div className="absolute inset-0 grid-pattern"></div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animation-delay-6000 {
          animation-delay: 6s;
        }

        .grid-pattern {
          mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.4) 0%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.4) 0%,
            transparent 100%
          );
        }

        @media (prefers-color-scheme: light) {
          .grid-pattern {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cdefs%3E%3Cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='%23000000' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='40' height='40' fill='url(%23grid)' /%3E%3C/svg%3E");
            opacity: 0.2;
          }
        }

        @media (prefers-color-scheme: dark) {
          .grid-pattern {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cdefs%3E%3Cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='40' height='40' fill='url(%23grid)' /%3E%3C/svg%3E");
            opacity: 0.15;
          }
        }
      `}</style>
    </div>
  );
}
