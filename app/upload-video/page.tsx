"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import FileUpload from "@/components/FileUpload";
import Image from "next/image";

interface Video {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl?: string;
}

export default function UploadVideoPage() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [videos, setVideos] = useState<Video[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loadingList, setLoadingList] = useState(true);

  useEffect(() => {
    fetch("/api/video")
      .then((res) => res.json())
      .then((data: Video[]) => setVideos(data))
      .catch(console.error)
      .finally(() => setLoadingList(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!title || !description || !videoUrl) {
      setErrorMsg("All fields are required");
      return;
    }
    try {
      const res = await fetch("/api/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, videoUrl, thumbnailUrl }),
      });
      if (!res.ok) throw new Error();
      const saved = await res.json();
      setVideos([saved, ...videos]);
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setThumbnailUrl("");
      setProgress(0);
    } catch {
      setErrorMsg("Failed to save video");
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold text-gray-800">YOUR-MP4</h1>
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <p className="text-gray-600">{session.user?.email}</p>
                <button
                  onClick={() => signOut()}
                  className="text-sm text-red-500 hover:underline"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => signIn()}
                className="btn-primary px-4 py-2"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto py-8">
        <div className="max-w-6xl mx-auto space-y-12 px-4">
          {/* Upload Form - only for signed-in users */}
          {session && (
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                Upload a New Video
              </h2>
              {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-6 md:grid-cols-2"
              >
                {/* Title */}
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-gray-700 font-medium">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter video title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-input"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-gray-700 font-medium">
                    Description
                  </label>
                  <textarea
                    placeholder="Enter video description"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-input"
                  />
                </div>

                {/* Thumbnail Upload */}
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    Thumbnail
                  </label>
                  <FileUpload
                    fileType="image"
                    onProgress={setProgress}
                    onSuccess={(res) => setThumbnailUrl(res.url)}
                  />
                  {thumbnailUrl && (
                    <Image
                      src={thumbnailUrl}
                      alt="Thumbnail preview"
                      className="rounded-md mt-2 h-32 object-cover"
                    />
                  )}
                </div>

                {/* Video Upload */}
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">
                    Video File
                  </label>
                  <FileUpload
                    fileType="video"
                    onProgress={setProgress}
                    onSuccess={(res) => setVideoUrl(res.url)}
                  />
                </div>

                {/* Progress Bar */}
                {progress > 0 && (
                  <div className="md:col-span-2">
                    <div className="progress-bar-bg">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Submit */}
                <div className="md:col-span-2">
                  <button type="submit" className="btn-primary w-full">
                    Save Video
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* Video Gallery - visible to everyone */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              All Videos
            </h2>
            {loadingList ? (
              <p className="text-gray-600">Loading…</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map((v) => (
                  <div
                    key={v._id}
                    className="bg-white shadow rounded-2xl overflow-hidden group hover:shadow-xl transition"
                  >
                    <video
                      src={v.videoUrl}
                      controls
                      poster={v.thumbnailUrl}
                      className="w-full h-48 object-cover bg-black"
                    />
                    <div className="p-4 space-y-2">
                      <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {v.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2">
                        {v.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
