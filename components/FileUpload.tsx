// components/FileUpload.tsx
"use client";

import React, { useState } from "react";
import { upload } from "@imagekit/next";

interface FileUploadProps {
  onSuccess: (res: { url: string; [key: string]: any }) => void;
  onProgress?: (percent: number) => void;
  fileType?: "image" | "video";
}

export default function FileUpload({
  onSuccess,
  onProgress,
  fileType = "image",
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File) => {
    if (fileType === "video" && !file.type.startsWith("video/")) {
      setError("Please upload a valid video file");
      return false;
    }
    if (file.size > 100 * 1024 * 1024) {
      setError("File size must be less than 100 MB");
      return false;
    }
    return true;
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file || !validateFile(file)) return;

    setUploading(true);
    setError(null);

    try {
      // 1) Fetch auth params from your route
      const authRes = await fetch("/api/imagekit-auth");
      const authData = await authRes.json();

      if (!authRes.ok || authData.error) {
        throw new Error(authData.error || "Failed to get upload auth");
      }

      // 2) Perform the upload
      const result = await upload({
        file,
        fileName: file.name,
        publicKey: authData.publicKey,
        signature: authData.signature,
        token: authData.token,
        expire: authData.expire,
        onProgress: (evt) => {
          if (evt.lengthComputable && onProgress) {
            const pct = Math.round((evt.loaded / evt.total) * 100);
            onProgress(pct);
          }
        },
      });

      // 3) Notify parent
      onSuccess(result);
    } catch (err: any) {
      console.error("Upload failed", err);
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept={fileType === "video" ? "video/*" : "image/*"}
        onChange={handleFileChange}
        disabled={uploading}
        className="form-input"
      />
      {uploading && <p className="text-gray-400 text-sm">Uploading…</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
