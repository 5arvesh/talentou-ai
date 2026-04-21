
import React, { useState } from 'react';
import { ImageComposer } from '@/components/ImageComposer';

export function ImageComposerTest() {
  const [compositeUrl, setCompositeUrl] = useState<string>('');

  const handleCompositeReady = (url: string) => {
    setCompositeUrl(url);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">Image Composer Test</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Original Images</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Base Image (with UI)</h3>
                <img 
                  src="/lovable-uploads/6e6e3c31-6ba0-4f11-9614-3dea7f8fdbca.png" 
                  alt="Base with UI" 
                  className="w-full rounded-lg border"
                />
              </div>
              
              <div>
                <h3 className="font-medium mb-2">New Woman Image</h3>
                <img 
                  src="/lovable-uploads/8abfed34-5baf-4772-ad0e-fbc76df492a9.png" 
                  alt="New woman" 
                  className="w-full rounded-lg border"
                />
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Compose New Image</h2>
            
            <ImageComposer onCompositeReady={handleCompositeReady} />
            
            {compositeUrl && (
              <div className="mt-6">
                <h3 className="font-medium mb-2">Result</h3>
                <img 
                  src={compositeUrl} 
                  alt="Composite result" 
                  className="w-full rounded-lg border"
                />
                <div className="mt-2 space-y-2">
                  <p className="text-sm text-gray-600">
                    Right-click and "Save image as..." to download the result.
                  </p>
                  <a 
                    href={compositeUrl} 
                    download="composite-auth-image.png"
                    className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Download Image
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
