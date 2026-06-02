"use client";

import { useState } from "react";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
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
        setMessage(data.message || "Something went wrong");
        return;
      }

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
      console.log(error);
      setMessage("Internal server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Add Hospital</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hospital Name */}
          <div>
            <label className="block mb-2 font-medium">Hospital Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter hospital name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">gmail</label>

            <input
              type="text"
              name="gmail"
              value={formData.gmail}
              onChange={handleChange}
              placeholder="Enter hospital name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">password</label>

            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter hospital name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Location */}
          <div>
            <label className="block mb-2 font-medium">Location</label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter hospital location"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium">Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter hospital description"
              rows={5}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Open Time */}
          <div>
            <label className="block mb-2 font-medium">Open Time</label>

            <input
              type="text"
              name="open_time"
              value={formData.open_time}
              onChange={handleChange}
              placeholder="Example: 24 hrs"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Logo */}
          <div>
            <label className="block mb-2 font-medium">Logo URL</label>

            <input
              type="text"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              placeholder="Enter logo image URL"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Hero Image 1 */}
          <div>
            <label className="block mb-2 font-medium">Hero Image 1 URL</label>

            <input
              type="text"
              name="hero_image1"
              value={formData.hero_image1}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Hero Image 2 */}
          <div>
            <label className="block mb-2 font-medium">Hero Image 2 URL</label>

            <input
              type="text"
              name="hero_image2"
              value={formData.hero_image2}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Premium */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="is_premium"
              checked={formData.is_premium}
              onChange={handleChange}
              className="h-5 w-5"
            />

            <label className="font-medium">Premium Hospital</label>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-semibold py-3 rounded-lg">
            {loading ? "Adding..." : "Add Hospital"}
          </button>

          {/* Message */}
          {message && (
            <div className="text-center font-medium text-sm">{message}</div>
          )}
        </form>
      </div>
    </div>
  );
}
