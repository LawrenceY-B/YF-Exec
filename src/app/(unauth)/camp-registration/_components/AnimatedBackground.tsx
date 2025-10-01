export default function AnimatedBackground() {
  return (
    <div className="fixed top-0 -z-20 h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-[#03030a] dark:via-[#03030a] dark:to-[#03030a]">
      {/* Animated gradient orbs - improved dark mode colors */}
      <div className="animate-blob absolute top-0 left-1/6 h-80 w-80 rounded-full bg-blue-300 opacity-40 mix-blend-multiply blur-3xl filter dark:bg-blue-600 dark:opacity-20 dark:mix-blend-normal"></div>
      <div className="animate-blob animation-delay-2000 absolute top-16 right-1/6 h-96 w-96 rounded-full bg-indigo-300 opacity-35 mix-blend-multiply blur-3xl filter dark:bg-indigo-500 dark:opacity-18 dark:mix-blend-normal"></div>
      <div className="animate-blob animation-delay-4000 absolute top-8 left-1/2 h-72 w-72 rounded-full bg-purple-300 opacity-30 mix-blend-multiply blur-3xl filter dark:bg-purple-600 dark:opacity-16 dark:mix-blend-normal"></div>
      <div className="animate-blob animation-delay-6000 absolute top-20 right-1/3 h-64 w-64 rounded-full bg-violet-300 opacity-25 mix-blend-multiply blur-3xl filter dark:bg-violet-500 dark:opacity-14 dark:mix-blend-normal"></div>

      {/* Enhanced themed glow */}
      <div className="dark:from-card/40 dark:via-card/20 absolute top-0 right-0 left-0 h-1/2 bg-gradient-to-b from-blue-100/30 via-indigo-50/15 to-transparent dark:to-transparent"></div>

      {/* Grid pattern overlay */}
      <div className="grid-pattern absolute inset-0"></div>

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
          background-size: 48px 48px;
          mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 60%, transparent 100%);
          -webkit-mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.5) 0%,
            rgba(0, 0, 0, 0.2) 60%,
            transparent 100%
          );
        }

        /* Light theme grid - more visible */
        .grid-pattern {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Cdefs%3E%3Cpattern id='grid' width='48' height='48' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 48 0 L 0 0 0 48' fill='none' stroke='%23475569' stroke-width='0.8' opacity='0.7'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='48' height='48' fill='url(%23grid)' /%3E%3C/svg%3E");
          opacity: 1;
        }

        /* Dark theme grid - more subtle and elegant */
        .dark .grid-pattern {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Cdefs%3E%3Cpattern id='grid' width='48' height='48' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 48 0 L 0 0 0 48' fill='none' stroke='%236366f1' stroke-width='0.5' opacity='0.15'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='48' height='48' fill='url(%23grid)' /%3E%3C/svg%3E");
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
