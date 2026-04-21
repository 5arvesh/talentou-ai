import { ReactNode } from "react";
import { HRSidebar } from "@/components/sidebar/HRSidebar";
import { Header } from "@/components/header/Header";

interface HRLayoutProps {
  children: ReactNode;
}

export function HRLayout({ children }: HRLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <HRSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}