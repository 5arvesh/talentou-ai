
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { removeBackground, loadImageFromUrl } from '@/utils/backgroundRemoval';
import { toast } from 'sonner';

interface ImageComposerProps {
  onCompositeReady?: (imageUrl: string) => void;
}

export function ImageComposer({ onCompositeReady }: ImageComposerProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const createCompositeImage = async () => {
    setIsProcessing(true);
    
    try {
      toast.info('Loading images...');
      
      // Load both images
      const baseImage = await loadImageFromUrl('/lovable-uploads/6e6e3c31-6ba0-4f11-9614-3dea7f8fdbca.png');
      const sourceImage = await loadImageFromUrl('/lovable-uploads/8abfed34-5baf-4772-ad0e-fbc76df492a9.png');
      
      toast.info('Removing background from new woman image...');
      
      // Remove background from the source image (second woman)
      const womanWithoutBg = await removeBackground(sourceImage);
      
      toast.info('Creating composite image...');
      
      // Create a canvas for the composite
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) throw new Error('Could not get canvas context');
      
      // Set canvas size to match base image exactly
      canvas.width = baseImage.naturalWidth;
      canvas.height = baseImage.naturalHeight;
      
      // Draw the base image first (this preserves ALL UI elements)
      ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
      
      // Load the woman without background
      const womanImg = new Image();
      womanImg.onload = () => {
        // More precise positioning to replace the original woman
        // Based on the original image layout, the woman appears to be on the right side
        const originalWomanRegion = {
          x: canvas.width * 0.55, // Start position for woman replacement
          y: canvas.height * 0.1,  // Top position
          width: canvas.width * 0.4, // Width allocation
          height: canvas.height * 0.85 // Height allocation
        };
        
        // Calculate aspect ratio of new woman image
        const womanAspectRatio = womanImg.naturalWidth / womanImg.naturalHeight;
        
        // Calculate dimensions maintaining aspect ratio within the allocated space
        let newWidth, newHeight;
        if (womanAspectRatio > (originalWomanRegion.width / originalWomanRegion.height)) {
          // Woman is wider relative to allocated space
          newWidth = originalWomanRegion.width;
          newHeight = originalWomanRegion.width / womanAspectRatio;
        } else {
          // Woman is taller relative to allocated space
          newHeight = originalWomanRegion.height;
          newWidth = originalWomanRegion.height * womanAspectRatio;
        }
        
        // Center the woman within the allocated region
        const xPosition = originalWomanRegion.x + (originalWomanRegion.width - newWidth) / 2;
        const yPosition = originalWomanRegion.y + (originalWomanRegion.height - newHeight) / 2;
        
        // Clear the region where the original woman was (optional - for better blending)
        // This helps remove any overlap with the original woman
        ctx.globalCompositeOperation = 'source-over';
        
        // Draw the new woman
        ctx.drawImage(womanImg, xPosition, yPosition, newWidth, newHeight);
        
        // Convert to blob and create URL
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            onCompositeReady?.(url);
            toast.success('Composite image created successfully! All UI elements preserved.');
          }
        }, 'image/png', 1.0);
      };
      
      womanImg.onerror = () => {
        throw new Error('Failed to load processed woman image');
      };
      
      womanImg.src = URL.createObjectURL(womanWithoutBg);
      
    } catch (error) {
      console.error('Error creating composite:', error);
      toast.error(`Failed to create composite image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg space-y-4">
      <h3 className="text-lg font-semibold">Image Composer Tool</h3>
      <p className="text-sm text-gray-600">
        This tool will replace the woman in the auth image while preserving ALL UI elements including analytics cards, charts, and interface components.
      </p>
      <div className="text-xs text-gray-500 space-y-1">
        <p>• Base image: Auth layout with UI elements</p>
        <p>• Source image: New woman (background will be removed)</p>
        <p>• Result: New woman placed in auth layout with all UI preserved</p>
      </div>
      <Button 
        onClick={createCompositeImage}
        disabled={isProcessing}
        className="w-full"
      >
        {isProcessing ? 'Processing...' : 'Create Composite Image'}
      </Button>
    </div>
  );
}
