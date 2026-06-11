import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DefaultTemplateEditor } from "./DefaultTemplateEditor";
import { SavedTemplatesList } from "./SavedTemplatesList";
import { DEFAULT_FORM_FIELDS, SAVED_TEMPLATES } from "@/constants/defaultFormTemplate";
import type { ApplicationFormTemplate, FormField } from "@/types/applicationForm";

export function ApplicationFormSettings() {
  const [defaultFields, setDefaultFields] = useState<FormField[]>(() => DEFAULT_FORM_FIELDS.map((f) => ({ ...f })));
  const [savedTemplates, setSavedTemplates] = useState<ApplicationFormTemplate[]>(() =>
    SAVED_TEMPLATES.map((t) => ({ ...t, fields: t.fields.map((f) => ({ ...f })) }))
  );

  const handleReset = () => {
    setDefaultFields(DEFAULT_FORM_FIELDS.map((f) => ({ ...f })));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Application form</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Configure the default fields shown on your careers page. Changes apply to all new job postings.
        </p>
      </div>

      <Tabs defaultValue="default" className="w-full">
        <TabsList className="mb-6 border-b w-full rounded-none bg-transparent justify-start space-x-8 px-0 h-auto">
          <TabsTrigger
            value="default"
            className="pb-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-500 data-[state=active]:text-brand-500 data-[state=inactive]:text-gray-500 bg-transparent shadow-none"
          >
            Default template
          </TabsTrigger>
          <TabsTrigger
            value="saved"
            className="pb-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-500 data-[state=active]:text-brand-500 data-[state=inactive]:text-gray-500 bg-transparent shadow-none"
          >
            Saved templates ({savedTemplates.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="default">
          <DefaultTemplateEditor fields={defaultFields} onFieldsChange={setDefaultFields} onReset={handleReset} />
        </TabsContent>

        <TabsContent value="saved">
          <SavedTemplatesList templates={savedTemplates} onTemplatesChange={setSavedTemplates} defaultFields={defaultFields} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
