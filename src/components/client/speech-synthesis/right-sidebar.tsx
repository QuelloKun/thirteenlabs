"use client";

import { useUIStore } from "~/stores/ui-store";
import { ServiceType } from "~/types/services";
import { VoiceSelector } from "../voice-selector";
import { HistoryPanel } from "./history-panel";
import { useState } from "react";
import { HistoryItem } from "~/lib/history";
import { IoClose } from "react-icons/io5";

export function SpeechSidebar({
  service,
  historyItems,
}: {
  service: ServiceType;
  historyItems?: HistoryItem[];
}) {
  const {
    activeTab,
    setActiveTab,
    isMobileMenuOpen,
    toggleMobileMenu,
    isMobileScreen,
  } = useUIStore();

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const tabButtonClasses = (tabName: 'settings' | 'history') => 
    `relative z-10 mr-4 pb-2 text-sm transition-colors duration-200 ${
      activeTab === tabName
        ? "border-b-2 border-black text-black dark:border-white dark:text-white"
        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
    }`;

  return (
    <>
      <div className="hidden h-full w-[350px] flex-col border-l border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950 md:flex lg:w-[500px]">
        <div className="relative mb-6 flex">
          <div className="absolute bottom-0 left-0 right-0 border-b border-gray-200 dark:border-gray-800"></div>
          <button
            onClick={() => setActiveTab("settings")}
            className={tabButtonClasses("settings")}
          >
            Settings
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={tabButtonClasses("history")}
          >
            History
          </button>
        </div>
        <div className="transition-opacity duration-200">
          {activeTab === "settings" ? (
            <div className="mb-6">
              <h2 className="mb-2 text-sm text-gray-900 dark:text-gray-100">Voice</h2>
              <VoiceSelector service={service} />
            </div>
          ) : (
            <HistoryPanel
              service={service}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              hoveredItem={hoveredItem}
              setHoveredItem={setHoveredItem}
              historyItems={historyItems}
            />
          )}
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileScreen && isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={toggleMobileMenu}
        />
      )}

      <div
        className={`fixed inset-x-0 bottom-0 z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="max-h-[80vh] overflow-y-auto rounded-t-xl bg-white p-5 shadow-lg dark:bg-gray-900">
          <div className="mb-4 flex items-center justify-end">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
            >
              <IoClose className="h-5 w-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="relative mb-6 flex">
            <div className="absolute bottom-0 left-0 right-0 border-b border-gray-200 dark:border-gray-800"></div>
            <button
              onClick={() => setActiveTab("settings")}
              className={tabButtonClasses("settings")}
            >
              Settings
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={tabButtonClasses("history")}
            >
              History
            </button>
          </div>

          {/* Tab content */}
          <div className="transition-opacity duration-200">
            {activeTab === "settings" ? (
              <div className="mb-6">
                <h2 className="mb-2 text-sm text-gray-900 dark:text-gray-100">Voice</h2>
                <VoiceSelector service={service} />
              </div>
            ) : (
              <HistoryPanel
                service={service}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                hoveredItem={hoveredItem}
                setHoveredItem={setHoveredItem}
                historyItems={historyItems}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}