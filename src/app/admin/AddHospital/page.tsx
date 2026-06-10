"use client";

import { Upload } from "lucide-react";
import { useState,useEffect} from "react";

export default function AddHospitalForm() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    is_premium: false,
    open_time: "",
    hero_image1: "",
    hero_image2: "",
    logo: "",
    gmail: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);
  async function uploadImage(
    file: File,
    field: "hero_image1" | "hero_image2" | "logo"
  ) {
    const uploadData = new FormData();
    uploadData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: uploadData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Image upload failed");
    }

    setFormData((prev) => ({
      ...prev,
      [field]: data.imageUrl,
    }));
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/addhospital", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        setMessage(data.message);
        return;
      }

      alert("Hospital added successfully");
      setMessage("Hospital added successfully");

      setFormData({
        name: "",
        location: "",
        description: "",
        is_premium: false,
        open_time: "",
        hero_image1: "",
        hero_image2: "",
        logo: "",
        gmail: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("Internal server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Add Hospital
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Hospital Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="email"
            name="gmail"
            placeholder="Hospital Gmail"
            value={formData.gmail}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            rows={5}
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="open_time"
            placeholder="24 Hours"
            value={formData.open_time}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          
          <div>
            <label
              htmlFor="logo"
              className="flex cursor-pointer items-center justify-center gap-2 border-2 border-dashed rounded-lg p-4"
            >
              <Upload size={20} />
              <span>
                {formData.logo
                  ? "logo Uploaded ✓"
                  : "Upload logo"}
              </span>
            </label>

            <input
              id="logo"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                try {
                  setLoading(true);
                  await uploadImage(file, "logo");
                  alert("logo uploaded");
                } catch (error) {
                  console.error(error);
                  alert("Upload failed");
                } finally {
                  setLoading(false);
                }
              }}
            />
          </div>

          {formData.logo && (
            <img
              src={formData.logo}
              alt="logo"
              className="h-32 w-32 rounded-lg object-cover border"
            />
          )}


          <div>
            <label
              htmlFor="hero-image-1"
              className="flex cursor-pointer items-center justify-center gap-2 border-2 border-dashed rounded-lg p-4"
            >
              <Upload size={20} />
              <span>
                {formData.hero_image1
                  ? "Hero Image 1 Uploaded ✓"
                  : "Upload Hero Image 1"}
              </span>
            </label>

            <input
              id="hero-image-1"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                try {
                  setLoading(true);
                  await uploadImage(file, "hero_image1");
                  alert("Image 1 uploaded");
                } catch (error) {
                  console.error(error);
                  alert("Upload failed");
                } finally {
                  setLoading(false);
                }
              }}
            />
          </div>

          {formData.hero_image1 && (
            <img
              src={formData.hero_image1}
              alt="Hero Image 1"
              className="h-32 w-32 rounded-lg object-cover border"
            />
          )}

          <div>
            <label
              htmlFor="hero-image-2"
              className="flex cursor-pointer items-center justify-center gap-2 border-2 border-dashed rounded-lg p-4"
            >
              <Upload size={20} />
              <span>
                {formData.hero_image2
                  ? "Hero Image 2 Uploaded ✓"
                  : "Upload Hero Image 2"}
              </span>
            </label>

            <input
              id="hero-image-2"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                try {
                  setLoading(true);
                  await uploadImage(file, "hero_image2");
                  alert("Image 2 uploaded");
                } catch (error) {
                  console.error(error);
                  alert("Upload failed");
                } finally {
                  setLoading(false);
                }
              }}
            />
          </div>

          {formData.hero_image2 && (
            <img
              src={formData.hero_image2}
              alt="Hero Image 2"
              className="h-32 w-32 rounded-lg object-cover border"
            />
          )}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_premium"
              checked={formData.is_premium}
              onChange={handleChange}
            />
            <label>Premium Hospital</label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            {loading ? "Processing..." : "Add Hospital"}
          </button>

          {message && (
            <p className="text-center text-sm font-medium">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}