
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Mail, Trash2, Search, Pencil } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

type Member = {
  id: string;
  name: string;
  email: string;
  roles: string[];
  avatarLetter: string;
  dateAdded: string;
  isCurrentUser: boolean;
};

export function MembersSettings() {
  const roles = ["TA Leader", "Recruiter", "Hiring Lead", "Interviewer", "HR"];
  
  const [members, setMembers] = useState<Member[]>([
    {
      id: "1",
      name: "Roney Soloman",
      email: "joseph.olassa@ignitho.com",
      roles: ["TA Leader", "Recruiter"],
      avatarLetter: "RS",
      dateAdded: "2024-01-15",
      isCurrentUser: true
    },
    {
      id: "2",
      name: "Anton Ciby",
      email: "anton.ciby@ignitho.com",
      roles: ["Recruiter"],
      avatarLetter: "AC",
      dateAdded: "2024-02-20",
      isCurrentUser: false
    },
    {
      id: "3",
      name: "Sarah Johnson",
      email: "sarah.j@ignitho.com",
      roles: ["Hiring Lead"],
      avatarLetter: "SJ",
      dateAdded: "2024-03-10",
      isCurrentUser: false
    },
    {
      id: "4",
      name: "Michael Chen",
      email: "michael.c@ignitho.com",
      roles: ["Interviewer"],
      avatarLetter: "MC",
      dateAdded: "2024-03-25",
      isCurrentUser: false
    },
    {
      id: "5",
      name: "Emily Davis",
      email: "emily.d@ignitho.com",
      roles: ["HR"],
      avatarLetter: "ED",
      dateAdded: "2024-04-05",
      isCurrentUser: false
    }
  ]);
  
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRoles, setInviteRoles] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [editRoles, setEditRoles] = useState<string[]>([]);
  
  const handleSendInvite = () => {
    if (!inviteEmail) {
      toast.error("Please enter an email address");
      return;
    }
    if (inviteRoles.length === 0) {
      toast.error("Please select at least one role");
      return;
    }
    
    toast.success("Invitation sent successfully");
    setIsInviteModalOpen(false);
    setInviteEmail("");
    setInviteRoles([]);
  };
  
  const handleDeleteMember = (id: string) => {
    setMembers(members.filter(member => member.id !== id));
    toast.success("Member removed from Talentou");
  };
  
  const handleEditMember = (member: Member) => {
    setEditingMember(member);
    setEditRoles(member.roles);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingMember) return;
    
    setMembers(members.map(m => 
      m.id === editingMember.id 
        ? { ...m, roles: editRoles }
        : m
    ));
    
    toast.success("Member access updated successfully");
    setIsEditModalOpen(false);
    setEditingMember(null);
    setEditRoles([]);
  };
  
  const filteredMembers = members.filter(member => {
    const matchesSearch = searchTerm === "" || 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Team Members</h2>
        <Button 
          onClick={() => setIsInviteModalOpen(true)} 
          className="bg-brand-600 hover:bg-brand-700 text-white"
        >
          + Invite
        </Button>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-center">TA Leader</TableHead>
              <TableHead className="text-center">Recruiter</TableHead>
              <TableHead className="text-center">Hiring Lead</TableHead>
              <TableHead className="text-center">Interviewer</TableHead>
              <TableHead className="text-center">HR</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                  No members found
                </TableCell>
              </TableRow>
            ) : (
              filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#7800d4] text-white flex items-center justify-center text-sm font-medium">
                        {member.avatarLetter}
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        {member.isCurrentUser && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">You</span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      className={
                        member.roles.includes("TA Leader")
                          ? "hover:bg-[#dcfce7]"
                          : "hover:bg-[#fee2e2]"
                      }
                      style={{
                        backgroundColor: member.roles.includes("TA Leader") ? "#dcfce7" : "#fee2e2",
                        color: member.roles.includes("TA Leader") ? "#1b8c69" : "#dc2626"
                      }}
                    >
                      {member.roles.includes("TA Leader") ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      className={
                        member.roles.includes("Recruiter")
                          ? "hover:bg-[#dcfce7]"
                          : "hover:bg-[#fee2e2]"
                      }
                      style={{
                        backgroundColor: member.roles.includes("Recruiter") ? "#dcfce7" : "#fee2e2",
                        color: member.roles.includes("Recruiter") ? "#1b8c69" : "#dc2626"
                      }}
                    >
                      {member.roles.includes("Recruiter") ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      className={
                        member.roles.includes("Hiring Lead")
                          ? "hover:bg-[#dcfce7]"
                          : "hover:bg-[#fee2e2]"
                      }
                      style={{
                        backgroundColor: member.roles.includes("Hiring Lead") ? "#dcfce7" : "#fee2e2",
                        color: member.roles.includes("Hiring Lead") ? "#1b8c69" : "#dc2626"
                      }}
                    >
                      {member.roles.includes("Hiring Lead") ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      className={
                        member.roles.includes("Interviewer")
                          ? "hover:bg-[#dcfce7]"
                          : "hover:bg-[#fee2e2]"
                      }
                      style={{
                        backgroundColor: member.roles.includes("Interviewer") ? "#dcfce7" : "#fee2e2",
                        color: member.roles.includes("Interviewer") ? "#1b8c69" : "#dc2626"
                      }}
                    >
                      {member.roles.includes("Interviewer") ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      className={
                        member.roles.includes("HR")
                          ? "hover:bg-[#dcfce7]"
                          : "hover:bg-[#fee2e2]"
                      }
                      style={{
                        backgroundColor: member.roles.includes("HR") ? "#dcfce7" : "#fee2e2",
                        color: member.roles.includes("HR") ? "#1b8c69" : "#dc2626"
                      }}
                    >
                      {member.roles.includes("HR") ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        onClick={() => handleEditMember(member)}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <Pencil className="h-4 w-4 text-blue-500" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteMember(member.id)}
                        variant="ghost"
                        disabled={member.isCurrentUser}
                        size="icon"
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Invite Team Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-5 py-4">
            <div>
              <h3 className="text-base font-medium mb-2">Email Address</h3>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="colleague@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-base font-medium mb-3">Role & Permissions</h3>
              <div className="space-y-3">
                {roles.map(role => (
                  <div key={role} className="flex items-center space-x-2">
                    <Checkbox
                      id={role}
                      checked={inviteRoles.includes(role)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setInviteRoles([...inviteRoles, role]);
                        } else {
                          setInviteRoles(inviteRoles.filter(r => r !== role));
                        }
                      }}
                      className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 data-[state=checked]:text-white"
                    />
                    <label htmlFor={role} className="text-sm cursor-pointer">
                      {role}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsInviteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSendInvite}
              className="bg-brand-600 hover:bg-brand-700 text-white"
            >
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Member Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Edit Member Access</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-5 py-4">
            {editingMember && (
              <div className="mb-4">
                <p className="font-medium">{editingMember.name}</p>
                <p className="text-sm text-muted-foreground">{editingMember.email}</p>
              </div>
            )}
            
            <div>
              <h3 className="text-base font-medium mb-3">Role & Permissions</h3>
              <div className="space-y-3">
                {roles.map(role => (
                  <div key={role} className="flex items-center space-x-2">
                    <Checkbox
                      id={`edit-${role}`}
                      checked={editRoles.includes(role)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setEditRoles([...editRoles, role]);
                        } else {
                          setEditRoles(editRoles.filter(r => r !== role));
                        }
                      }}
                      className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 data-[state=checked]:text-white"
                    />
                    <label htmlFor={`edit-${role}`} className="text-sm cursor-pointer">
                      {role}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveEdit}
              className="bg-brand-600 hover:bg-brand-700 text-white"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
