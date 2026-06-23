"use client";

import { File, Upload } from "lucide-react";
import { useState, useEffect } from "react";

export default function AddDoctorPage() {
  const [formData, setFormData] = useState({
    name: "",
    specialist: "",
    education: "",
    experience: "",
    hospital: "",
    image: "",
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
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  async function uploadImage(file: File) {
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
      image: data.imageUrl,
    }));
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("/api/admin/adddoctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
      } else {
        setMessage("Doctor added successfully");
        alert("Doctor added successfully");
        setFormData({
          name: "",
          specialist: "",
          education: "",
          experience: "",
          hospital: "",
          image: "",
        });
      }
    } catch (error) {
      console.log(error);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className=" bg-gray-100 flex items-center justify-center py-7">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Add Doctor</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Doctor Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg outline-none"
          />
          <input
            type="text"
            name="specialist"
            placeholder="Specialist"
            value={formData.specialist}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg outline-none"
          />
          <input
            type="text"
            name="education"
            placeholder="Education"
            value={formData.education}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg outline-none"
          />
          <input
            type="text"
            name="experience"
            placeholder="Experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg outline-none"
          />
          <input
            type="text"
            name="hospital"
            placeholder="Hospital Name"
            value={formData.hospital}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg outline-none"
          />

          <div>
            <label
              htmlFor="doctor-image"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-4 text-gray-600 transition hover:border-black hover:text-black">
              <Upload size={20} />
              <span className="font-medium">
                {formData.image ? "File Uploaded ✓" : "Upload a File"}
              </span>
            </label>
            <input
              id="doctor-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];

                if (!file) return;

                try {
                  setLoading(true);
                  await uploadImage(file);
                  alert("Image uploaded successfully");
                } catch (error) {
                  console.error(error);
                  alert("Image upload failed");
                } finally {
                  setLoading(false);
                }
              }}
            />
          </div>
          {formData.image && (
            <div className="mt-4 flex justify-center">
              <img
                src={formData.image}
                alt="Doctor Preview"
                className="h-32 w-32 rounded-xl border object-cover"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
            {loading ? "Adding..." : "Add Doctor"}
          </button>
        </form>

        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </div>
    </div>
  );
}
