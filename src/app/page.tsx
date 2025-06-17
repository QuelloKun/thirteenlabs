import Link from "next/link";
import { ThemeToggle } from "~/components/client/theme-toggle";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-950/80">
        <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            ThirteenLabs
          </Link>
          <nav className="flex items-center space-x-4">
            <Link
              href="/app/sign-in"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Sign In
            </Link>
            <Link
              href="/app/sign-up"
              className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Sign Up
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto max-w-5xl px-4 py-20 text-center sm:py-32">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl md:text-6xl">
            Next Generation Voice Synthesis
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Create lifelike speech, change voices, and generate realistic sound
            effects with the power of AI. Get started in seconds.
          </p>
          <div className="mt-10">
            <Link
              href="/app/sign-up"
              className="rounded-md bg-black px-8 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto flex h-16 max-w-5xl items-center justify-center px-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} ThirteenLabs. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}