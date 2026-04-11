"use client";

import { useCallback, useRef, useState } from "react";

const MAX_USES = 2;

type State = "idle" | "loading" | "streaming" | "done" | "error";

export function CritiqueForm() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [critique, setCritique] = useState("");
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [usesLeft, setUsesLeft] = useState(MAX_USES);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please upload an image file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("Image must be under 10MB.");
      return;
    }
    setErrorMsg("");
    setImageFile(file);
    setCritique("");
    setState("idle");
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const submitCritique = async () => {
    if (!imageFile || usesLeft <= 0) return;

    setState("loading");
    setCritique("");
    setErrorMsg("");

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await fetch("/api/ceramics-critique", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setErrorMsg(json.error || "Something went wrong. Please try again.");
        setState("error");
        return;
      }

      // Stream the response
      setState("streaming");
      setUsesLeft((n) => n - 1);

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let text = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setCritique(text);
      }

      setState("done");
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setState("error");
    }
  };

  const reset = () => {
    setImageFile(null);
    setImagePreview(null);
    setCritique("");
    setState("idle");
    setErrorMsg("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const exhausted = usesLeft <= 0;

  return (
    <div className="space-y-6">
      {/* Uses remaining */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-smoke">
          Critiques remaining this session
        </span>
        <span
          className={
            "text-sm font-bold tabular-nums " +
            (usesLeft > 0 ? "text-ash" : "text-ember")
          }
        >
          {usesLeft} / {MAX_USES}
        </span>
      </div>

      {exhausted && (
        <div className="border border-ember bg-cream px-4 py-4">
          <p className="text-sm text-ash font-semibold mb-1">
            You&apos;ve used both critiques for this session.
          </p>
          <p className="text-xs text-smoke">
            Come back anytime for two more free critiques. Each session resets
            when you open a new browser tab.
          </p>
        </div>
      )}

      {/* Upload area */}
      {!exhausted && (
        <div>
          <span className="block text-[11px] font-semibold uppercase tracking-widest text-smoke mb-2">
            Upload a photo of your piece
          </span>

          <div
            onClick={() => !imagePreview && fileInputRef.current?.click()}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            className={
              "border-2 border-dashed transition-colors " +
              (isDragging
                ? "border-ember bg-cream"
                : "border-line bg-white hover:border-ash") +
              (imagePreview ? " cursor-default" : " cursor-pointer")
            }
          >
            {imagePreview ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imagePreview}
                  alt="Your ceramic piece"
                  className="w-full max-h-80 object-contain"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    reset();
                  }}
                  className="absolute top-2 right-2 bg-ash text-white text-xs px-2 py-1 hover:opacity-80 transition-opacity"
                >
                  Change photo
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                <div className="text-3xl mb-3 text-smoke/40">&#8682;</div>
                <p className="text-sm font-semibold text-ash mb-1">
                  Drop your photo here, or click to browse
                </p>
                <p className="text-xs text-smoke">
                  JPEG, PNG, or WebP — up to 10MB
                </p>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={onFileChange}
            className="hidden"
          />
        </div>
      )}

      {/* Error */}
      {errorMsg && (
        <div className="border border-ember bg-cream px-4 py-3">
          <p className="text-sm text-ash">&#9888; {errorMsg}</p>
        </div>
      )}

      {/* Submit */}
      {imageFile && !exhausted && state !== "streaming" && state !== "done" && (
        <button
          type="button"
          onClick={submitCritique}
          disabled={state === "loading"}
          className="w-full bg-ash hover:opacity-90 disabled:opacity-50 text-white font-semibold py-3.5 text-base transition-opacity"
        >
          {state === "loading" ? "Analyzing your piece..." : "Get critique"}
        </button>
      )}

      {/* Critique output */}
      {(state === "streaming" || state === "done") && critique && (
        <div className="border border-line bg-white">
          <div className="bg-cream px-5 py-3 border-b border-line">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-smoke">
              Ceramics critique
            </p>
          </div>
          <div className="px-5 py-5">
            <div className="text-[15px] text-ash leading-relaxed whitespace-pre-wrap">
              {critique}
              {state === "streaming" && (
                <span className="inline-block w-1.5 h-4 bg-ember ml-0.5 animate-pulse align-middle" />
              )}
            </div>
          </div>
          {state === "done" && (
            <div className="px-5 py-3 bg-cream border-t border-line">
              <p className="text-xs text-ash">
                <span className="font-semibold">Studio tip:</span> Screenshots
                work great for saving your critique alongside your piece in a
                studio notebook.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Try another */}
      {state === "done" && usesLeft > 0 && (
        <button
          type="button"
          onClick={reset}
          className="w-full border border-line text-smoke hover:text-ash py-2.5 text-sm transition-colors"
        >
          Critique another piece ({usesLeft} remaining)
        </button>
      )}
    </div>
  );
}
