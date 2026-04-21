
import React from "react";
import { Eye } from "lucide-react";
import { 
  Table,
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export type FeedbackItem = {
  id: number;
  feedback: string;
  response?: string;
  responseBy?: string;
  responseByInitials?: string;
  status: "pending" | "responded";
  date: string;
};

type FeedbackTableProps = {
  feedbackItems: FeedbackItem[];
  onViewFeedback: (id: number) => void;
};

export const FeedbackTable = ({ feedbackItems, onViewFeedback }: FeedbackTableProps) => {
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%]">Feedback</TableHead>
            <TableHead className="w-[30%]">Response</TableHead>
            <TableHead className="w-[20%]">Response By</TableHead>
            <TableHead className="w-[10%] text-right">View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feedbackItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                {item.feedback.length > 60 
                  ? `${item.feedback.substring(0, 60)}...` 
                  : item.feedback}
              </TableCell>
              <TableCell>
                {item.status === "pending" ? (
                  <span className="text-amber-500 dark:text-amber-400">
                    Waiting for response from the Sales Leader
                  </span>
                ) : (
                  item.response && item.response.length > 40
                    ? `${item.response.substring(0, 40)}...`
                    : item.response
                )}
              </TableCell>
              <TableCell>
                {item.status === "responded" && (
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 bg-blue-600">
                      <AvatarFallback>{item.responseByInitials}</AvatarFallback>
                    </Avatar>
                    <span>{item.responseBy}</span>
                  </div>
                )}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-8 w-8"
                  onClick={() => onViewFeedback(item.id)}
                >
                  <Eye className="h-5 w-5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
