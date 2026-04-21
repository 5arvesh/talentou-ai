import { ReactNode } from "react";
import { SuperAdminSidebar } from "@/components/sidebar/SuperAdminSidebar";
import { Header } from "@/components/header/Header";

interface SuperAdminLayoutProps {
  children: ReactNode;
}

export function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <SuperAdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
