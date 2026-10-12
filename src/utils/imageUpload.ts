import { uploadImageToCloudinary, getCloudinaryConfig } from './cloudinary';

export async function compressImageToDataUrl(
  file: File,
  maxWidth = 1200,
  maxHeight = 900,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => reject(new Error('Failed to load image for compression'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export async function uploadPortfolioImage(file: File): Promise<string> {
  const { cloudName, uploadPreset } = getCloudinaryConfig();

  // If Cloudinary is configured, use it for persistent CDN hosting
  if (cloudName && uploadPreset) {
    try {
      return await uploadImageToCloudinary(file);
    } catch (err) {
      console.warn('Cloudinary upload error, falling back to optimized compression:', err);
    }
  }

  // Fallback: Compress image to web-optimized data URL so it never relies on broken blob URLs
  return await compressImageToDataUrl(file, 1000, 750, 0.78);
}

export async function uploadResumeFile(file: File): Promise<string> {
  const { cloudName, uploadPreset } = getCloudinaryConfig();

  if (cloudName && uploadPreset) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.secure_url) {
          return data.secure_url;
        }
      }
    } catch (err) {
      console.warn('Cloudinary resume upload error, falling back to data URL:', err);
    }
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
