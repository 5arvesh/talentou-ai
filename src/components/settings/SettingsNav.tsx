
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
  Award,
  Target,
  Globe,
  ClipboardList,
  History,
  BookMarked,
  IdCard
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTourStore } from "@/store/tour-store";

/** Paths considered "relevant" to a given role while that role's Settings tour is active —
 *  drives a tour-scoped dimming treatment only. Settings nav itself stays fully unfiltered/routable
 *  for everyone at all other times; this never changes actual navigation. */
const SETTINGS_RELEVANT_PATHS: Record<string, string[]> = {
  "ta-leader": ["/settings/license", "/settings/playbooks", "/settings/members", "/settings/careers", "/settings/integrations"],
  "recruiter": ["/settings/profile"],
  "hiring-lead": ["/settings/profile", "/settings/application-form"],
};

const NAV_TOUR_IDS: Record<string, string> = {
  "/settings/playbooks": "settings-nav-playbooks",
  "/settings/members": "settings-nav-members",
  "/settings/careers": "settings-nav-careers",
  "/settings/integrations": "settings-nav-integrations",
  "/settings/application-form": "settings-nav-application-form",
  "/settings/profile": "settings-nav-profile",
};

// Define the navigation items with their icons and paths
const navItems = [
  {
    icon: User,
    label: "Account",
    path: "/settings"
  },
  {
    icon: IdCard,
    label: "Profile",
    path: "/settings/profile"
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
    icon: Globe,
    label: "Careers Page",
    path: "/settings/careers"
  },
  {
    icon: ClipboardList,
    label: "Application Form",
    path: "/settings/application-form"
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
    icon: Target,
    label: "Job Fit Score",
    path: "/settings/job-fit-score"
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
  },
  {
    icon: History,
    label: "Approval History",
    path: "/settings/approval-history"
  },
  {
    icon: BookMarked,
    label: "Playbooks",
    path: "/settings/playbooks"
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
  const { tourKey, isVisible } = useTourStore();

  // Active only while THIS role's top-level "settings" screen tour is on-screen — not e.g. a
  // sub-page's own tour (Careers' own tour keeps tourKey ending in ":careers-page", not ":settings").
  const activeSettingsRole = isVisible && tourKey?.endsWith(":settings") ? tourKey.split(":")[0] : null;
  const relevantPaths = activeSettingsRole ? SETTINGS_RELEVANT_PATHS[activeSettingsRole] : null;

  return (
    <div>
      <nav data-tour-id="settings-nav">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.path === "/settings"
                ? currentPath === "/settings"
                : currentPath.startsWith(item.path);
            const isDimmed = !!relevantPaths && !relevantPaths.includes(item.path);

            return (
              <li key={item.label} className={cn(isDimmed && "opacity-35 pointer-events-none transition-opacity")}>
                <Link
                  to={item.path}
                  data-tour-id={NAV_TOUR_IDS[item.path]}
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
