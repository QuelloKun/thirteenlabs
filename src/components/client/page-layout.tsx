"use client";

import { ReactNode, useEffect } from "react";
import { ServiceType } from "~/types/services";
import Sidebar from "./sidebar";
import { useUIStore } from "~/stores/ui-store";
import { IoClose, IoMenu } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SpeechSidebar } from "./speech-synthesis/right-sidebar";
import { HistoryItem } from "~/lib/history";
import Playbar from "./playbar";
import { useAudioStore } from "~/stores/audio-store";
import { MobileSettingsButton } from "./speech-synthesis/mobile-settings-button";
import { AlertTriangle } from "lucide-react"; // <-- 1. Import an icon

export function PageLayout({
  title,
  children,
  service,
  tabs,
  showSidebar = true,
  historyItems,
}: {
  title: string;
  children: ReactNode;
  service: ServiceType;
  tabs?: TabItem[];
  showSidebar: boolean;
  historyItems?: HistoryItem[];
}) {
  const pathname = usePathname();
  const {
    isMobileDrawerOpen,
    isMobileScreen,
    isMobileMenuOpen,
    toggleMobileDrawer,
    setMobileScreen,
    toggleMobileMenu,
  } = useUIStore();
  const { currentAudio } = useAudioStore();

  useEffect(() => {
    const checkScreenSize = () => {
      setMobileScreen(window.innerWidth < 1024);
    };
    window.addEventListener("resize", checkScreenSize);
    checkScreenSize(); // Run on initial load
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [setMobileScreen]);

  return (
    <div className="flex h-screen">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {isMobileScreen && isMobileDrawerOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50" />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="shadow-log relative h-full w-64 bg-white dark:bg-gray-900">
          <button
            onClick={toggleMobileDrawer}
            className="absolute right-2 top-2 rounded-full p-2 text-gray-500 hover:bg-gray-100"
          >
            <IoClose />
          </button>
          <Sidebar isMobile={true} />
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="border-b border-gray-200 dark:border-gray-800">
          <div className="flex h-16 items-center px-4">
            {isMobileScreen && (
              <button
                onClick={toggleMobileDrawer}
                className="mr-3 rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
              >
                <IoMenu className="h-6 w-6" />
              </button>
            )}
            <h1 className="text-md font-semibold">{title}</h1>

            {tabs && tabs.length > 0 && (
              <div className="ml-4 hidden items-center md:flex">
                {tabs.map((tab) => (
                  <Link
                    className={`mr-2 rounded-full px-3 py-1 text-sm transition-colors duration-200 ${
                      pathname === tab.path
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    }`}
                    key={tab.path}
                    href={tab.path}
                  >
                    {tab.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* --- 2. ADD THIS BANNER DIV --- */}
        <div className="border-b border-yellow-300 bg-yellow-50 p-3 text-center text-sm text-yellow-900 dark:border-yellow-900/50 dark:bg-yellow-900/20 dark:text-yellow-200">
          <div className="flex items-center justify-center gap-2">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            <span>
              Note: Backend services run on an EC2 instance that may not always
              be active.
            </span>
          </div>
        </div>
        {/* --- END OF BANNER --- */}

        <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
          <div className="flex h-full">
            <div className="flex-1 px-6 py-5">
              <div className="flex h-full flex-col">{children}</div>
            </div>

            {showSidebar && service && (
              <SpeechSidebar historyItems={historyItems} service={service} />
            )}
          </div>
        </div>

        {isMobileScreen && !pathname.includes("/app/sound-effects") && (
          <MobileSettingsButton toggleMobileMenu={toggleMobileMenu} />
        )}

        {currentAudio && <Playbar />}
      </div>
    </div>
  );
}

interface TabItem {
  name: string;
  path: string;
}