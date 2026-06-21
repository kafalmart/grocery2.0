"use client";

import {
  useEffect,
  useState,
} from "react";
import api from "@/services/api";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(
    "/api",
    ""
  );

export default function BannerPage() {
  const [file, setFile] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState("");

  const [
    currentBanner,
    setCurrentBanner,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const fetchBanner =
    async () => {
      try {
        const res =
          await api.get(
            "/banner"
          );

        if (
          res.data.data?.image
        ) {
          setCurrentBanner(
            `${BACKEND_URL}${res.data.data.image}`
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    fetchBanner();
  }, []);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selected =
      e.target.files?.[0];

    if (!selected)
      return;

    setFile(selected);
    setPreview(
      URL.createObjectURL(
        selected
      )
    );
  };

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      if (!file) {
        alert(
          "Please select an image."
        );
        return;
      }

      try {
        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "image",
          file
        );

        await api.put(
          "/banner",
          formData
        );

        alert(
          "Banner updated successfully!"
        );

        setFile(null);
        setPreview("");

        await fetchBanner();
      } catch (error: any) {
        console.error(
          error.response?.data
        );

        alert(
          error.response?.data
            ?.message ||
            "Upload failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="mb-8 text-3xl font-bold">
          Manage Banner
        </h1>

        {currentBanner && (
          <div className="mb-8">
            <h2 className="mb-3 text-lg font-semibold">
              Current Banner
            </h2>

            <img
              src={
                currentBanner
              }
              alt="Banner"
              className="w-full rounded-2xl"
            />
          </div>
        )}

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-6"
        >
          <input
            type="file"
            accept="image/*"
            onChange={
              handleFileChange
            }
            className="w-full rounded-xl border p-3"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full rounded-2xl"
            />
          )}

          <button
            disabled={
              loading
            }
            className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white"
          >
            {loading
              ? "Uploading..."
              : "Update Banner"}
          </button>
        </form>
      </div>
    </div>
  );
}