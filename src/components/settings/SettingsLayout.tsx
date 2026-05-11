import React from "react";
import { Layout } from "@/components/layout/Layout";
import { SettingsNav } from "./SettingsNav";

interface SettingsLayoutProps {
  children: React.ReactNode;
  maxWidth?: string;
}

export function SettingsLayout({ children, maxWidth = "max-w-6xl" }: SettingsLayoutProps) {
  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)] w-full">
        <div className="w-72 flex-shrink-0 border-r border-gray-200 dark:border-gray-700 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Settings</h1>
            <SettingsNav />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-800">
          <div className={`p-6 ${maxWidth}`}>
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
}
