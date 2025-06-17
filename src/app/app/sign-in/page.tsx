"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SignInFormValues, signInSchema } from "~/schemas/auth";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "~/components/client/theme-toggle";

export default function SignInPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const email = watch("email");
  const password = watch("password");

  useEffect(() => {
    setIsFormValid(!!email && !!password);
  }, [email, password]);

  const onSubmit = async (data: SignInFormValues) => {
    try {
      setIsLoading(true);

      const signInResult = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (!signInResult?.error) {
        router.push("/app/speech-synthesis/text-to-speech");
      } else {
        setError(
          signInResult.error === "CredentialsSignin"
            ? "Invalid email or password"
            : "Something went wrong"
        );
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50 dark:bg-gray-950">
      <div className="relative flex w-full flex-col items-center justify-center p-4 lg:w-1/2">
        <header className="absolute left-0 top-0 w-full p-6 lg:p-8">
          <div className="mx-auto flex max-w-md items-center justify-between lg:mx-0 lg:max-w-full">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-black dark:text-white"
            >
              ThirteenLabs
            </Link>
            <ThemeToggle />
          </div>
        </header>

        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-gray-900 md:p-8">
            <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Log in to your account
            </h2>

            {error && (
              <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-500">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-gray-800 dark:text-gray-200"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email address"
                  required
                  className="w-full rounded-lg border border-gray-200 bg-white p-2 placeholder:text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:placeholder-gray-400 dark:focus:border-white"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium text-gray-800 dark:text-gray-200"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-lg border border-gray-200 bg-white p-2 placeholder:text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:placeholder-gray-400 dark:focus:border-white"
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || !isFormValid}
                className={`my-4 w-full rounded-full py-2.5 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:bg-gray-400 ${
                  isFormValid
                    ? "bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                    : "bg-gray-400"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="mr-2 h-4 w-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>

              <div className="text-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Don&apos;t have an account?{" "}
                  <a
                    className="font-medium text-black underline dark:text-white"
                    href="/app/sign-up"
                  >
                    Sign up
                  </a>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden py-[3vh] pr-[3vh] lg:block lg:w-1/2">
        <div className="hidden h-full rounded-3xl bg-gradient-to-b from-indigo-100 via-purple-100 to-[#5960d7] lg:block">
          <div className="flex h-full flex-col p-12">
            <div className="flex h-full items-center justify-center">
              <Image
                className="w-full rounded-lg"
                alt="Dashboard preview"
                src="/placeholder.png"
                width={1200}
                height={800}
              />
            </div>
            <div className="h-fit w-full max-w-lg">
              <div className="mb-3 flex w-fit rounded-2xl bg-indigo-100 bg-opacity-40 px-3 py-1">
                <span className="text-xs font-medium uppercase tracking-wider text-white">
                  Latest updates
                </span>
              </div>
              <h3 className="text-lg text-white xl:text-xl 2xl:text-2xl 2xl:leading-10">
                Use the text-to-speech editor to create voiceovers in multiple
                voices using AI.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}