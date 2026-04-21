import { useState } from "react";
import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Button } from "@/components/ui/button";
import { TenantDialog } from "@/components/super-admin/TenantDialog";
import { SuccessDialog } from "@/components/super-admin/SuccessDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, DollarSign, UserPlus } from "lucide-react";

interface Tenant {
  id: string;
  name: string;
  domain: string;
  email: string;
  plan: string;
  users: number;
  totalCredits: number;
  usedCredits: number;
  remainingCredits: number;
  daysToExpire: number;
  status: "active" | "suspended";
  createdDate: string;
}

const mockTenants: Tenant[] = [
  {
    id: "1",
    name: "Acme Corporation",
    domain: "acme.com",
    email: "admin@acme.com",
    plan: "Enterprise",
    users: 250,
    totalCredits: 100000,
    usedCredits: 45000,
    remainingCredits: 55000,
    daysToExpire: 45,
    status: "active",
    createdDate: "2024-01-15",
  },
  {
    id: "2",
    name: "TechStart Inc",
    domain: "techstart.io",
    email: "contact@techstart.io",
    plan: "Professional",
    users: 50,
    totalCredits: 25000,
    usedCredits: 23000,
    remainingCredits: 2000,
    daysToExpire: 12,
    status: "active",
    createdDate: "2024-02-20",
  },
  {
    id: "3",
    name: "Global Solutions Ltd",
    domain: "globalsolutions.com",
    email: "info@globalsolutions.com",
    plan: "Enterprise",
    users: 500,
    totalCredits: 200000,
    usedCredits: 120000,
    remainingCredits: 80000,
    daysToExpire: 60,
    status: "active",
    createdDate: "2023-11-10",
  },
  {
    id: "4",
    name: "Small Business Co",
    domain: "smallbiz.com",
    email: "owner@smallbiz.com",
    plan: "Basic",
    users: 10,
    totalCredits: 5000,
    usedCredits: 4900,
    remainingCredits: 100,
    daysToExpire: 3,
    status: "active",
    createdDate: "2024-03-05",
  },
  {
    id: "5",
    name: "Innovate Systems",
    domain: "innovatesys.com",
    email: "admin@innovatesys.com",
    plan: "Professional",
    users: 75,
    totalCredits: 30000,
    usedCredits: 30000,
    remainingCredits: 0,
    daysToExpire: 0,
    status: "suspended",
    createdDate: "2024-01-25",
  },
];

export default function TenantManagementPage() {
  const [tenants] = useState<Tenant[]>(mockTenants);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [successEmail, setSuccessEmail] = useState("");

  const handleInviteTenant = () => {
    setDialogMode("create");
    setSelectedTenant(null);
    setDialogOpen(true);
  };

  const handleEditTenant = (tenant: Tenant) => {
    setDialogMode("edit");
    setSelectedTenant(tenant);
    setDialogOpen(true);
  };

  const handleSuccess = (email: string) => {
    setSuccessEmail(email);
    setSuccessDialogOpen(true);
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <SuperAdminLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tenant Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage tenant subscriptions, credits, and billing information
            </p>
          </div>
          <Button
            onClick={handleInviteTenant}
            style={{ backgroundColor: "#4ead3b", color: "black" }}
            className="hover:opacity-90"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Tenant
          </Button>
        </div>

        {/* Table */}
        <div className="bg-card rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Tenant</TableHead>
                <TableHead className="font-semibold">Plan</TableHead>
                <TableHead className="font-semibold text-right">No. of Users</TableHead>
                <TableHead className="font-semibold text-right">Total Credits</TableHead>
                <TableHead className="font-semibold text-right">Used Credits</TableHead>
                <TableHead className="font-semibold text-right">Remaining Credits</TableHead>
                <TableHead className="font-semibold text-right">Days to Expire</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Created Date</TableHead>
                <TableHead className="font-semibold text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenants.map((tenant) => (
                <TableRow key={tenant.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{tenant.name}</TableCell>
                  <TableCell>{tenant.plan}</TableCell>
                  <TableCell className="text-right">{formatNumber(tenant.users)}</TableCell>
                  <TableCell className="text-right">{formatNumber(tenant.totalCredits)}</TableCell>
                  <TableCell className="text-right">{formatNumber(tenant.usedCredits)}</TableCell>
                  <TableCell className="text-right">{formatNumber(tenant.remainingCredits)}</TableCell>
                  <TableCell className="text-right">
                    <span className={tenant.daysToExpire <= 14 ? "text-red-500 font-medium" : ""}>
                      {tenant.daysToExpire} days
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={tenant.status === "active" ? "default" : "destructive"}
                      className={
                        tenant.status === "active"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                    >
                      {tenant.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{tenant.createdDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEditTenant(tenant)}
                        className="p-2 hover:bg-muted rounded-md transition-colors"
                        title="Edit tenant"
                      >
                        <Pencil className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                      </button>
                      <button
                        className="p-2 hover:bg-muted rounded-md transition-colors"
                        title="Billing"
                      >
                        <DollarSign className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Dialogs */}
      <TenantDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        mode={dialogMode}
        tenant={selectedTenant}
        onSuccess={handleSuccess}
      />

      <SuccessDialog
        open={successDialogOpen}
        onOpenChange={setSuccessDialogOpen}
        email={successEmail}
      />
    </SuperAdminLayout>
  );
}
