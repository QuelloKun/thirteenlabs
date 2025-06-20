"use client";

import { GoDownload } from "react-icons/go";

export function GenerateButton({
  onGenerate,
  isDisabled,
  isLoading,
  showDownload,
  creditsRemaining,
  characterCount,
  characterLimit,
  buttonText = "Generate Speech",
  className,
  fullWidth,
  showCharacterCount,
  showCredits,
}: {
  onGenerate: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  showDownload?: boolean;
  creditsRemaining: number;
  characterCount?: number;
  characterLimit?: number;
  buttonText?: string;
  className?: string;
  fullWidth?: boolean;
  showCharacterCount?: boolean;
  showCredits?: boolean;
}) {
  return (
    <div
      className={`flex w-full flex-col-reverse items-center gap-4 md:flex-row md:justify-between ${className}`}
    >
      {(showCredits ||
        (showCharacterCount && characterCount !== undefined)) && (
        <div className="items-cetner flex w-full flex-wrap justify-between gap-2">
          {showCredits && (
            <div className="flex items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {creditsRemaining.toLocaleString()} credits remaining
              </span>
            </div>
          )}

          {showCharacterCount &&
            characterCount !== undefined &&
            characterLimit !== undefined && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                <span>{characterCount}</span> / <span>{characterLimit}</span>
                <span className="ml-1 hidden sm:inline-block">characters</span>
              </p>
            )}
        </div>
      )}

      <div
        className={`flex items-center gap-3 ${
          fullWidth ? "w-full" : "w-full md:w-fit"
        }`}
      >
        {showDownload && (
          <button
            className="hidden min-h-9 min-w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 lg:flex"
            type="button"
            disabled={true}
          >
            <GoDownload className="h-4 w-4" />
          </button>
        )}

        <button
          className={`h-9 w-full whitespace-nowrap rounded-lg px-3 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
            isDisabled || isLoading
              ? ""
              : "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          }`}
          onClick={onGenerate}
          disabled={isDisabled || isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
              <span className="ml-2">{buttonText}</span>
            </div>
          ) : (
            buttonText
          )}
        </button>
      </div>
    </div>
  );
}