import React, { useRef, useState } from 'react';
import { Folder, Files, FileText, X, Sparkles, Wand2 } from 'lucide-react';

interface UploadStageProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  onParse: () => void;
}

const ACCEPT = ['.pdf', '.doc', '.docx'];

function isCv(file: File) {
  const name = file.name.toLowerCase();
  return ACCEPT.some((ext) => name.endsWith(ext));
}

function formatSize(bytes: number) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export function UploadStage({ files, onFilesChange, onParse }: UploadStageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const next = Array.from(incoming).filter(isCv);
    const existing = new Set(files.map((f) => f.name + f.size));
    const merged = [...files, ...next.filter((f) => !existing.has(f.name + f.size))].slice(0, 50);
    onFilesChange(merged);
  };

  const removeFile = (idx: number) => onFilesChange(files.filter((_, i) => i !== idx));

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        data-tour-id="bulk-upload-dropzone"
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
        className="rounded-[14px] text-center px-6 py-10 transition-colors"
        style={{
          border: `1.5px dashed ${dragOver ? '#7800D3' : '#B9A8DC'}`,
          background: dragOver ? '#F4F0FB' : '#FBFAFD',
        }}
      >
        <div className="w-[52px] h-[52px] rounded-full mx-auto flex items-center justify-center mb-3" style={{ background: '#EEEDFE' }}>
          <Folder className="h-6 w-6" style={{ color: '#7800D3' }} />
        </div>
        <p className="font-sora text-[15px] font-semibold" style={{ color: '#1A0B2E' }}>Drop a folder of CVs, or select files</p>
        <p className="text-[13px] text-[#777] mt-1 max-w-md mx-auto">
          Talentou will read each CV and extract candidate details automatically — no template or formatting required.
        </p>
        <p className="text-[11px] text-[#999] mt-2">Supports .pdf, .doc, .docx · up to 50 files per upload</p>

        <div className="flex items-center justify-center gap-3 mt-5">
          <button
            type="button"
            onClick={() => folderInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 rounded-[10px] px-4 py-[9px] text-[13px] bg-white"
            style={{ border: '1.5px solid #B9A8DC', color: '#5A2A9E', fontWeight: 600 }}
          >
            <Folder className="h-4 w-4" />
            Choose folder
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 rounded-[10px] px-4 py-[9px] text-[13px] bg-white"
            style={{ border: '1.5px solid #B9A8DC', color: '#5A2A9E', fontWeight: 600 }}
          >
            <Files className="h-4 w-4" />
            Select files
          </button>
        </div>

        <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" multiple className="hidden" onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }} />
        {/* @ts-expect-error webkitdirectory is a non-standard but widely supported attribute */}
        <input ref={folderInputRef} type="file" webkitdirectory="" directory="" multiple className="hidden" onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }} />
      </div>

      {/* Selected file list */}
      {files.length > 0 && (
        <div className="space-y-1.5 max-h-[180px] overflow-y-auto pr-1">
          {files.map((file, i) => (
            <div key={file.name + i} className="flex items-center gap-2.5 rounded-[10px] bg-[#F7F6FA] px-3 py-2">
              <FileText className="h-4 w-4 text-[#7800D3] shrink-0" />
              <span className="text-[12px] text-[#333] flex-1 truncate">{file.name}</span>
              <span className="text-[11px] text-[#999] shrink-0">{formatSize(file.size)}</span>
              <button type="button" onClick={() => removeFile(i)} className="shrink-0 transition-colors hover:text-[#A02020]" style={{ color: '#999' }}>
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Info banner */}
      <div className="flex items-start gap-2.5 rounded-[10px] px-3.5 py-3" style={{ background: '#F6F3FC' }}>
        <Sparkles className="h-4 w-4 shrink-0 mt-px" style={{ color: '#7800D3' }} />
        <p className="text-[12px] leading-[1.5]" style={{ color: '#3C2A66' }}>
          No need to pick a job upfront — once parsed, Talentou will suggest the best-matching open position for each
          candidate based on their skills and experience. You can confirm or change any match before importing.
        </p>
      </div>

      {/* Primary CTA */}
      <button
        type="button"
        onClick={onParse}
        disabled={files.length === 0}
        className="w-full inline-flex items-center justify-center gap-2 rounded-[10px] h-12 text-[14px] font-semibold text-white transition-opacity disabled:opacity-40"
        style={{ background: '#7800D3' }}
      >
        <Wand2 className="h-4 w-4" />
        Parse {files.length} {files.length === 1 ? 'CV' : 'CVs'}
      </button>
    </div>
  );
}

export default UploadStage;
