
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  User,
  PaintBucket,
  Users,
  Link2,
  CreditCard,
  Clock,
  Share2,
  Video,
  Mail,
  Database,
  Shield,
  FileText,
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";

// Define the navigation items with their icons and paths
const navItems = [
  {
    icon: User,
    label: "Account",
    path: "/settings"
  },
  {
    icon: PaintBucket,
    label: "Theme",
    path: "/settings/theme"
  },
  {
    icon: Users,
    label: "Members",
    path: "/settings/members"
  },
  {
    icon: Link2,
    label: "Integrations",
    path: "/settings/integrations"
  },
  {
    icon: CreditCard,
    label: "Plan & Billing",
    path: "/settings/billing"
  },
  {
    icon: Video,
    label: "Interview Settings",
    path: "/settings/interview"
  },
  {
    icon: Mail,
    label: "E-Mail Templates",
    path: "/settings/email-templates"
  },
  {
    icon: Database,
    label: "ATS Integration",
    path: "/settings/ats-integration"
  },
  {
    icon: Shield,
    label: "Authentication",
    path: "/settings/authentication"
  },
  {
    icon: FileText,
    label: "Policy Document",
    path: "/settings/policy"
  },
  {
    icon: Award,
    label: "License",
    path: "/settings/license"
  }
  // {
  //   icon: Clock,
  //   label: "Credit Usage",
  //   path: "/settings/credit"
  // },
  // {
  //   icon: Share2,
  //   label: "Referrals",
  //   path: "/settings/referrals"
  // }
];

export function SettingsNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div>
      <nav>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = 
              item.path === "/settings" 
                ? currentPath === "/settings" 
                : currentPath.startsWith(item.path);
                
            return (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    isActive
                      ? "bg-brand-50 text-brand-500 dark:bg-gray-700 dark:text-brand-400"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
