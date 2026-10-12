export interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
}

export function getCloudinaryConfig(): CloudinaryConfig {
  let cloudName = (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '').trim();
  let uploadPreset = (import.meta.env.VITE_CLOUDINARY_PRESET || '').trim();

  try {
    const raw = localStorage.getItem('aman_maurya_portfolio_cms_v1');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.settings?.cloudinaryCloudName) {
        cloudName = parsed.settings.cloudinaryCloudName.trim();
      }
      if (parsed?.settings?.cloudinaryPreset) {
        uploadPreset = parsed.settings.cloudinaryPreset.trim();
      }
    }
  } catch {}

  return { cloudName, uploadPreset };
}

export async function uploadImageToCloudinary(file: File): Promise<string> {
  const { cloudName, uploadPreset } = getCloudinaryConfig();

  if (!cloudName || !uploadPreset) {
    throw new Error(
      'Cloudinary is not configured. Please open Settings in the Admin Dashboard and enter your Cloudinary Cloud Name and unsigned Upload Preset.'
    );
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(
      errorJson?.error?.message || `Cloudinary upload failed with status ${res.status}`
    );
  }

  const data = await res.json();
  if (data?.secure_url) {
    return data.secure_url;
  }
  throw new Error('Cloudinary response did not contain a secure_url');
}
