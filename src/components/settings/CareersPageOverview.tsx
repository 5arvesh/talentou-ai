import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, X, Copy, Check, RefreshCw, AlertCircle } from 'lucide-react';

// TODO: connect to API â€” GET /settings/careers
const MOCK_SNIPPET_ID = 'tal_snip_abc123xyz';
const MOCK_TOKEN = 'tok_live_9f8e7d6c5b';

export function CareersPageOverview() {
  const [domains, setDomains] = useState<string[]>([]);
  const [domainInput, setDomainInput] = useState('');
  const [isActive, setIsActive] = useState(true); // TODO: from API
  const [snippetId, setSnippetId] = useState(MOCK_SNIPPET_ID);
  const [copied, setCopied] = useState(false);

  const embedCode = `<div id="talentou-careers"></div>\n<script async\n  src="https://dev.talentou.app/widget.js"\n  data-id="${snippetId}"\n  data-token="${MOCK_TOKEN}"\n></script>`;

  const handleAddDomain = () => {
    const trimmed = domainInput.trim();
    if (!trimmed || domains.includes(trimmed)) return;
    setDomains([...domains, trimmed]);
    setDomainInput('');
  };

  const handleRemoveDomain = (d: string) => {
    setDomains(domains.filter((x) => x !== d));
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(embedCode);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleStatus = () => {
    // TODO: PATCH /settings/careers/status
    setIsActive(!isActive);
    toast.success(isActive ? 'Careers page disabled' : 'Careers page enabled');
  };

  const handleRegenerate = () => {
    // TODO: POST /settings/careers/regenerate
    setSnippetId('tal_snip_' + Math.random().toString(36).slice(2, 10));
    toast.success('Snippet ID regenerated');
  };

  return (
    <div className="space-y-8">
      {/* Allowed Domains */}
      <section data-tour-id="careers-allowed-domains" className="space-y-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Allowed Domains</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Restrict where the embed code can run. Leave empty to allow all domains.</p>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="example.com"
            value={domainInput}
            onChange={(e) => setDomainInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddDomain()}
            className="h-9"
          />
          <Button
            type="button"
            size="icon"
            className="h-9 w-9 shrink-0 bg-green-500 hover:bg-[#3d9e2c] text-white"
            onClick={handleAddDomain}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {domains.length === 0 ? (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-700">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            No domain restrictions â€” the widget will work on any website.
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {domains.map((d) => (
              <span key={d} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-xs border">
                {d}
                <button onClick={() => handleRemoveDomain(d)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Careers Page Status */}
      <section>
        <h3 className="text-sm font-semibold text-foreground mb-3">Careers Page Status</h3>
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className={`h-2.5 w-2.5 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
              <div>
                <p className="text-sm font-semibold">Careers Page Status</p>
                <p className="text-xs text-muted-foreground">{isActive ? 'Active and visible to visitors' : 'Inactive â€” not visible to visitors'}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggleStatus}
              className={isActive ? 'text-red-600 border-red-300 hover:bg-red-50' : 'text-green-600 border-green-500/40 hover:bg-green-50'}
            >
              {isActive ? 'Disable' : 'Enable'}
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Embed Code */}
      <section data-tour-id="careers-embed-code" className="space-y-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Embed Code</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Copy this snippet and paste it into your website's HTML.</p>
        </div>
        <div className="relative rounded-lg overflow-hidden">
          <pre className="bg-gray-900 text-green-400 font-mono text-xs p-4 overflow-x-auto whitespace-pre leading-relaxed">
            {embedCode}
          </pre>
          <button
            onClick={handleCopy}
            className="absolute top-2.5 right-2.5 p-1.5 rounded bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors"
            title="Copy to clipboard"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
        <div className="space-y-1 text-xs text-muted-foreground">
          <p>Snippet ID: <span className="font-mono text-foreground">{snippetId}</span></p>
          <p>Add <code className="bg-muted px-1 py-0.5 rounded font-mono">data-mode="floating"</code> for a floating button.</p>
          <p>Add <code className="bg-muted px-1 py-0.5 rounded font-mono">data-mode="full-page"</code> for full-page mode.</p>
        </div>
      </section>

      {/* Regenerate Snippet ID */}
      <section>
        <h3 className="text-sm font-semibold text-foreground mb-3">Regenerate Snippet ID</h3>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" /> Regenerate
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Regenerate Snippet ID?</AlertDialogTitle>
              <AlertDialogDescription>
                Regenerating the Snippet ID will break existing embeds on your website. You will need to update the embed code everywhere it is used. Are you sure?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleRegenerate} className="bg-red-600 hover:bg-red-700">
                Yes, Regenerate
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
    </div>
  );
}
