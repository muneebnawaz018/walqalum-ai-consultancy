"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";

/** Mirrors the server's allowlist in app/api/upload/route.ts. */
const ACCEPT = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "image/avif": [".avif"],
};

const MAX_BYTES = 5 * 1024 * 1024;

/**
 * The upload control, everywhere an image is picked.
 *
 * `<input type="file">` renders the operating system's own grey Choose File
 * button, which no amount of CSS reaches and which looks like nothing else on
 * the page. react-dropzone is headless: it hands back the props and the drag
 * state and draws nothing, so the chrome below is ours. It also brings the
 * parts worth not writing twice, chiefly a drag counter that does not flicker
 * as the pointer crosses child elements, and rejection reasons per file.
 *
 * The size and type limits are repeated from the route on purpose. They are the
 * courtesy copy, so a 40MB file fails instantly instead of after the upload;
 * the server still sniffs magic bytes and remains the one that decides.
 */
export function Dropzone({
  label,
  hint,
  value,
  busy,
  onFile,
  onClear,
}: {
  label: string;
  hint?: string;
  value?: string;
  busy?: boolean;
  onFile: (file: File) => void;
  onClear?: () => void;
}) {
  const [refused, setRefused] = useState<string | null>(null);

  const onDrop = useCallback(
    (accepted: File[], rejections: FileRejection[]) => {
      if (rejections.length) {
        const reason = rejections[0].errors[0];
        setRefused(
          reason.code === "file-too-large"
            ? "That file is over the 5MB limit."
            : reason.code === "file-invalid-type"
              ? "Images only: JPEG, PNG, WebP or AVIF. SVG is refused on purpose."
              : reason.message
        );
        return;
      }
      setRefused(null);
      if (accepted[0]) onFile(accepted[0]);
    },
    [onFile]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: ACCEPT,
    maxSize: MAX_BYTES,
    multiple: false,
    noClick: Boolean(value),
    noKeyboard: Boolean(value),
    disabled: busy,
  });

  return (
    <div className="dz-field">
      <span className="dz-label">{label}</span>

      <div
        {...getRootProps({
          className: `dz${isDragActive ? " over" : ""}${busy ? " busy" : ""}${value ? " filled" : ""}`,
        })}
      >
        <input {...getInputProps()} />

        {value ? (
          <div className="dz-preview">
            <span className="dz-thumb">
              <Image alt="" src={value} fill sizes="88px" unoptimized />
            </span>
            <div className="dz-preview-text">
              <strong>Image attached</strong>
              <span className="dz-path">{value}</span>
            </div>
            <div className="dz-preview-acts">
              <button type="button" onClick={open} disabled={busy}>
                Replace
              </button>
              {onClear ? (
                <button type="button" onClick={onClear} disabled={busy}>
                  Remove
                </button>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="dz-empty">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="dz-icon">
              <path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5" />
              <path d="M3 15v3a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-3" />
            </svg>
            <strong>{busy ? "Uploading" : isDragActive ? "Drop it here" : "Drag an image here"}</strong>
            <span>{busy ? "Hold on" : "or click to choose one"}</span>
            {hint ? <span className="dz-hint">{hint}</span> : null}
          </div>
        )}
      </div>

      {refused ? <p className="dz-refused">{refused}</p> : null}
    </div>
  );
}
