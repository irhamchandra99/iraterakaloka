"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const BUCKET = "blog-images";
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

type CoverImageUploadProps = {
  value: string;
  onChange: (url: string) => void;
  onPendingChange: (pending: boolean) => void;
};

export default function CoverImageUpload({
  value,
  onChange,
  onPendingChange,
}: CoverImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // Bebaskan object URL preview saat diganti atau komponen dilepas
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function resetSelection() {
    setFile(null);
    setPreviewUrl("");
    onPendingChange(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
    setError("");
    const selected = e.target.files?.[0];

    if (!selected) {
      resetSelection();
      return;
    }

    if (!ALLOWED_TYPES[selected.type]) {
      resetSelection();
      setError("Only JPG, PNG, and WebP images are allowed.");
      return;
    }

    if (selected.size > MAX_SIZE) {
      resetSelection();
      setError("Image must be 5 MB or smaller.");
      return;
    }

    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
    onPendingChange(true);
  }

  async function handleUpload() {
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const supabase = createClient();
      const extension = ALLOWED_TYPES[file.type];
      const path = `covers/${crypto.randomUUID()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, {
          cacheControl: "3600",
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from(BUCKET).getPublicUrl(path);

      onChange(publicUrl);
      resetSelection();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to upload image."
      );
    } finally {
      setUploading(false);
    }
  }

  const shownImage = previewUrl || value;

  return (
    <div className="space-y-4">
      {shownImage && (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-[#FCFAF7]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={shownImage}
            alt="Cover preview"
            className="aspect-video w-full object-cover"
          />
          <p className="px-4 py-2 text-xs text-black/50">
            {previewUrl
              ? "Preview — not uploaded yet"
              : "Current cover image"}
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        id="cover-file"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleSelect}
        disabled={uploading}
        className="block w-full text-sm text-black/60 file:mr-4 file:rounded-full file:border file:border-[#880A18] file:bg-white file:px-5 file:py-2 file:font-semibold file:text-[#880A18] hover:file:border-[#FFCA18] hover:file:bg-[#FFCA18] disabled:opacity-50"
      />

      <p className="text-xs text-black/50">
        JPG, PNG, or WebP. Max 5 MB.
      </p>

      {file && (
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => void handleUpload()}
            disabled={uploading}
            className="rounded-full bg-[#880A18] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#6E0814] disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </button>

          <button
            type="button"
            onClick={resetSelection}
            disabled={uploading}
            className="rounded-full px-5 py-2 text-sm font-semibold text-black/60 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      )}

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
