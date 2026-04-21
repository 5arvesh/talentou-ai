import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";
import { toast } from "sonner";

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

export function LicenseSettings() {
  const currentPlan = "Daily 13";
  const remainingInterviews = 75;
  const totalInterviews = 100;
  const aiReviews = "Unlimited";
  const fraudDetectionHours = "Unlimited";

  const handleUpgrade = (planName: string) => {
    toast.info(`Upgrade to ${planName} plan`);
  };

  return (
    <div className="space-y-6">
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
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Remaining Interviews</span>
                <span className="text-sm text-muted-foreground">
                  {remainingInterviews} / {totalInterviews}
                </span>
              </div>
              <Progress value={(remainingInterviews / totalInterviews) * 100} />
            </div>

            <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm font-medium">AI powered reviews</span>
              <span className="text-sm font-semibold">{aiReviews}</span>
            </div>

            <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm font-medium">Fraud Detection Hours</span>
              <span className="text-sm font-semibold">{fraudDetectionHours}</span>
            </div>
          </div>

          <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
            Upgrade Plan
          </Button>
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
