// utils/upload.ts
// Reusable image upload utility.
// Calls our Next.js proxy route /api/update-asset which forwards to hairxify uploadassets.
//
// Usage:
//   const result = await uploadImage(file, "services/3");
//   if (result.success) console.log(result.imagePath);

import { getStoredCredentials } from "./user";

interface UpdateImageResult {
  success: boolean;
  message: string;
  imagePath?: string;
}

/**
 * Uploads a single image file via the /api/upload-asset proxy.
 * @param file   The File object to upload.
 * @param path   Storage path hint, e.g. "services/3" or "providers/7".
 */
export async function updateImage(
  file: File,
  path: string,
): Promise<UpdateImageResult> {
  const { token } = getStoredCredentials();

  const formData = new FormData();
  formData.append("file", file);
  formData.append("path", path);

  try {
    const res = await fetch("/api/update-asset", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data: { success: boolean; message?: string; imagePath?: string } =
      await res.json();

    if (!res.ok || !data.success) {
      return { success: false, message: data.message ?? "Upload failed" };
    }

    return {
      success: true,
      message: "Updated successfully",
      imagePath: data.imagePath,
    };
  } catch (err) {
    console.error("[updateImage]", err);
    return { success: false, message: "Network error. Please try again." };
  }
}
