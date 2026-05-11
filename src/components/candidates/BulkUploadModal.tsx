import { useState, useCallback } from "react";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ParsedRow {
  name: string;
  email: string;
  phone: string;
  skills: string;
  experience: string;
  location: string;
  status: string;
}

interface BulkUploadModalProps {
  open: boolean;
  file: File | null;
  onClose: () => void;
  onImport: (rows: ParsedRow[]) => void;
}

const EXPECTED_COLUMNS = ["name", "email", "phone", "skills", "experience", "location", "status"];

function parseCSV(text: string): ParsedRow[] {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map(h => h.trim().toLowerCase().replace(/['"]/g, ""));
  return lines.slice(1).map(line => {
    const values = line.split(",").map(v => v.trim().replace(/^["']|["']$/g, ""));
    const row: Record<string, string> = {};
    headers.forEach((h, i) => { row[h] = values[i] ?? ""; });
    return {
      name: row.name ?? "",
      email: row.email ?? "",
      phone: row.phone ?? "",
      skills: row.skills ?? "",
      experience: row.experience ?? "",
      location: row.location ?? "",
      status: row.status ?? "Applied",
    };
  }).filter(r => r.name || r.email);
}

function parseXLSX(buffer: ArrayBuffer): ParsedRow[] {
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const json = XLSX.utils.sheet_to_json<Record<string, string>>(sheet, { defval: "" });
  return json.map(row => {
    const normalised: Record<string, string> = {};
    Object.entries(row).forEach(([k, v]) => { normalised[k.toLowerCase().trim()] = String(v); });
    return {
      name: normalised.name ?? "",
      email: normalised.email ?? "",
      phone: normalised.phone ?? "",
      skills: normalised.skills ?? "",
      experience: normalised.experience ?? "",
      location: normalised.location ?? "",
      status: normalised.status ?? "Applied",
    };
  }).filter(r => r.name || r.email);
}

export function BulkUploadModal({ open, file, onClose, onImport }: BulkUploadModalProps) {
  const [rows, setRows] = useState<ParsedRow[]>([]);
  const [parsed, setParsed] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);

  const parseFile = useCallback(async (f: File) => {
    setParseError(null);
    setParsed(false);
    setRows([]);
    try {
      if (f.name.endsWith(".csv")) {
        const text = await f.text();
        const result = parseCSV(text);
        setRows(result);
      } else {
        const buffer = await f.arrayBuffer();
        const result = parseXLSX(buffer);
        setRows(result);
      }
      setParsed(true);
    } catch {
      setParseError("Could not parse the file. Please check that it matches the expected format.");
    }
  }, []);

  // Parse file whenever modal opens with a new file
  if (open && file && !parsed && !parseError) {
    parseFile(file);
  }

  const handleClose = () => {
    setParsed(false);
    setRows([]);
    setParseError(null);
    onClose();
  };

  const handleConfirm = () => {
    onImport(rows);
    toast.success(`${rows.length} candidate${rows.length !== 1 ? "s" : ""} imported successfully`);
    handleClose();
  };

  const preview = rows.slice(0, 5);

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); }}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-[#7800D3]" />
            Bulk Candidate Upload
          </DialogTitle>
        </DialogHeader>

        {/* File info */}
        {file && (
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
            <Upload className="h-4 w-4 text-gray-500 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
            {parsed && (
              <Badge className="bg-green-50 text-green-700 border-green-200 border">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                {rows.length} rows found
              </Badge>
            )}
          </div>
        )}

        {/* Parse error */}
        {parseError && (
          <div className="flex items-start gap-3 px-4 py-3 bg-red-50 rounded-lg border border-red-200 text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Parse error</p>
              <p className="text-xs mt-0.5">{parseError}</p>
            </div>
          </div>
        )}

        {/* Expected format hint */}
        <div className="text-xs text-muted-foreground px-1">
          Expected columns: <span className="font-mono">{EXPECTED_COLUMNS.join(", ")}</span>
        </div>

        {/* Preview table */}
        {parsed && rows.length > 0 && (
          <div className="rounded-lg border border-gray-100 overflow-hidden">
            <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
              <p className="text-xs font-medium text-gray-600">
                Preview — first {Math.min(5, rows.length)} of {rows.length} rows
              </p>
            </div>
            <div className="overflow-x-auto">
              <Table className="text-xs">
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="py-2">Name</TableHead>
                    <TableHead className="py-2">Email</TableHead>
                    <TableHead className="py-2">Phone</TableHead>
                    <TableHead className="py-2">Skills</TableHead>
                    <TableHead className="py-2">Experience</TableHead>
                    <TableHead className="py-2">Location</TableHead>
                    <TableHead className="py-2">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {preview.map((row, i) => (
                    <TableRow key={i} className={cn(i % 2 === 0 ? "bg-white" : "bg-gray-50/50")}>
                      <TableCell className="py-1.5 font-medium">{row.name || "—"}</TableCell>
                      <TableCell className="py-1.5 text-muted-foreground">{row.email || "—"}</TableCell>
                      <TableCell className="py-1.5 text-muted-foreground">{row.phone || "—"}</TableCell>
                      <TableCell className="py-1.5 max-w-[120px] truncate">{row.skills || "—"}</TableCell>
                      <TableCell className="py-1.5">{row.experience || "—"}</TableCell>
                      <TableCell className="py-1.5">{row.location || "—"}</TableCell>
                      <TableCell className="py-1.5">{row.status || "Applied"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {parsed && rows.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No valid rows found in the file. Check that the file has data and matches the expected columns.
          </div>
        )}

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleConfirm}
            disabled={!parsed || rows.length === 0}
            style={{ backgroundColor: "#7800D3", color: "white" }}
            className="hover:opacity-90"
          >
            Import {parsed ? `${rows.length} ` : ""}Candidate{rows.length !== 1 ? "s" : ""}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
