import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, AlertTriangle, UploadCloud, Video, MessageSquareText } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const NEAR_CAP_THRESHOLD = 0.8;
const HEALTHY_THRESHOLD = 0.3;
const RING_RADIUS = 54;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function UsageRing({ usedCredits, totalCredits }: { usedCredits: number; totalCredits: number }) {
  const usedPct = (usedCredits / totalCredits) * 100;
  const [animatedPct, setAnimatedPct] = useState(0);
  const isNearCap = usedPct >= NEAR_CAP_THRESHOLD * 100;
  const isHealthy = usedPct < HEALTHY_THRESHOLD * 100;

  useEffect(() => {
    const t = setTimeout(() => setAnimatedPct(usedPct), 100);
    return () => clearTimeout(t);
  }, [usedPct]);

  const offset = RING_CIRCUMFERENCE * (1 - animatedPct / 100);
  const ringColor = isNearCap ? "#ef4444" : isHealthy ? "#22c55e" : "#f59e0b";

  return (
    <div
      className={cn(
        "relative h-32 w-32 shrink-0 rounded-full",
        isHealthy && "animate-credit-ring-pulse-settle",
        isNearCap && "animate-credit-ring-pulse-danger"
      )}
    >
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={RING_RADIUS} fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r={RING_RADIUS}
          fill="none"
          stroke={ringColor}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 900ms cubic-bezier(0.16, 1, 0.3, 1), stroke 0.3s ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-sora text-2xl font-bold text-foreground">{usedCredits}</span>
        <span className="text-[10px] text-muted-foreground">of {totalCredits} credits</span>
      </div>
    </div>
  );
}

interface CreditBreakdownRow {
  icon: typeof UploadCloud;
  label: string;
  count: number;
}

function CreditBreakdownList({ rows }: { rows: CreditBreakdownRow[] }) {
  return (
    <div data-tour-id="license-credit-breakdown" className="space-y-2">
      {rows.map((row) => (
        <div key={row.label} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30">
          <span className="flex items-center gap-2 text-sm text-foreground">
            <row.icon className="h-4 w-4 text-muted-foreground" />
            {row.label}
          </span>
          <span className="text-sm font-semibold">{row.count}</span>
        </div>
      ))}
    </div>
  );
}

const plans = [
  {
    id: "plus",
    name: "Plus",
    color: "emerald",
    features: [
      "300 monthly interviews",
      "Unlimited AI reviews",
      "Unlimited fraud detection",
      "Live Chat support",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    color: "purple",
    features: [
      "600 monthly interviews",
      "Unlimited AI reviews",
      "Unlimited fraud detection",
      "Dedicated Account Manager support",
    ],
  },
];

const CREDIT_BREAKDOWN: CreditBreakdownRow[] = [
  { icon: UploadCloud, label: "Bulk import parsing", count: 14 },
  { icon: Video, label: "AI interviews", count: 8 },
  { icon: MessageSquareText, label: "Plan chat edits", count: 3 },
];

export function LicenseSettings() {
  const currentPlan = "Daily 13";
  const remainingInterviews = 75;
  const totalInterviews = 100;
  const usedCredits = totalInterviews - remainingInterviews;
  const aiReviews = "Unlimited";
  const fraudDetectionHours = "Unlimited";
  const usedPct = (usedCredits / totalInterviews) * 100;
  const isNearCap = usedPct >= NEAR_CAP_THRESHOLD * 100;
  const isAtCap = usedPct >= 100;

  const handleUpgrade = (planName: string) => {
    toast.info(`Upgrade to ${planName} plan`);
  };

  return (
    <div className="space-y-6">
      {isNearCap && (
        <div className={cn(
          "flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium",
          isAtCap ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning"
        )}>
          <AlertTriangle className="h-4 w-4 shrink-0" />
          {isAtCap
            ? "You've reached your plan's usage cap for this cycle."
            : "You're near your plan's usage cap for this cycle."}
        </div>
      )}

      {/* Current Plan and Usage */}
      <div className="bg-white dark:bg-gray-800 rounded-md p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Current Plan</h2>
          <p className="text-sm text-muted-foreground">
            Manage your subscription and view usage
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
            <span className="font-medium">Current Plan</span>
            <Badge className="bg-primary">{currentPlan}</Badge>
          </div>

          <div className="space-y-4">
            <div data-tour-id="license-usage-bar" className="flex items-center gap-5 p-4 bg-muted/30 rounded-lg">
              <UsageRing usedCredits={usedCredits} totalCredits={totalInterviews} />
              <div>
                <p className="text-sm font-medium">Remaining Interviews</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {remainingInterviews} / {totalInterviews} left this cycle
                </p>
                <p className="text-xs text-muted-foreground mt-1">Resets with your billing cycle.</p>
              </div>
            </div>

            <CreditBreakdownList rows={CREDIT_BREAKDOWN} />

            <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm font-medium">AI powered reviews</span>
              <span className="text-sm font-semibold">{aiReviews}</span>
            </div>

            <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm font-medium">Fraud Detection Hours</span>
              <span className="text-sm font-semibold">{fraudDetectionHours}</span>
            </div>
          </div>

          {isNearCap && (
            <Button data-tour-id="license-upgrade-cta" className="w-full bg-emerald-600 hover:bg-emerald-700">
              Upgrade Plan
            </Button>
          )}
        </div>
      </div>

      {/* Available Plans */}
      <div className="bg-white dark:bg-gray-800 rounded-md p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Available Plans</h2>
          <p className="text-sm text-muted-foreground">
            Choose a plan that fits your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative overflow-hidden border-2 ${
                plan.color === "emerald"
                  ? "border-emerald-500"
                  : "border-purple-500"
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <Badge
                    className={
                      plan.color === "emerald"
                        ? "bg-emerald-600"
                        : "bg-purple-600"
                    }
                  >
                    Popular
                  </Badge>
                </div>
                <CardDescription>Perfect for growing teams</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check
                        className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                          plan.color === "emerald"
                            ? "text-emerald-600"
                            : "text-purple-600"
                        }`}
                      />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.color === "emerald"
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-purple-600 hover:bg-purple-700"
                  }`}
                  onClick={() => handleUpgrade(plan.name)}
                >
                  Upgrade to {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
