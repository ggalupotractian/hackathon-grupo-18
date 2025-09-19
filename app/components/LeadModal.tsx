import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  assetRange: string;
}

const LeadModal = ({ isOpen, onClose, assetRange }: LeadModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    industry: "",
  });

  const jobTitles = [
    "Maintenance Manager",
    "Operations Manager",
    "Plant Manager",
    "Reliability Engineer",
    "Facility Manager",
    "Production Manager",
    "Engineering Manager",
    "Other",
  ];

  const industries = [
    "Manufacturing",
    "Oil & Gas",
    "Mining",
    "Food & Beverage",
    "Pharmaceutical",
    "Chemical",
    "Pulp & Paper",
    "Automotive",
    "Aerospace",
    "Other",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", { ...formData, assetRange });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg bg-white rounded-lg shadow-xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-light"
        >
          ×
        </button>

        {/* Modal Content */}
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Get Custom Quote
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700 placeholder-gray-400"
                required
              />
            </div>

            {/* Work Email */}
            <div>
              <input
                type="email"
                placeholder="Work Email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700 placeholder-gray-400"
                required
              />
            </div>

            {/* Phone and Job Title Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phone */}
              <div className="flex">
                <div className="flex items-center px-3 py-4 border border-gray-300 border-r-0 rounded-l-lg bg-gray-50">
                  <span className="text-xl mr-2">🇺🇸</span>
                  <span className="text-gray-600">+1</span>
                </div>
                <input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="flex-1 p-4 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700 placeholder-gray-400"
                  required
                />
              </div>

              {/* Job Title */}
              <div>
                <select
                  value={formData.jobTitle}
                  onChange={(e) =>
                    handleInputChange("jobTitle", e.target.value)
                  }
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700 bg-white appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled className="text-gray-400">
                    Job Title
                  </option>
                  {jobTitles.map((title) => (
                    <option key={title} value={title}>
                      {title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Industry Sector */}
            <div>
              <select
                value={formData.industry}
                onChange={(e) => handleInputChange("industry", e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700 bg-white appearance-none cursor-pointer"
                required
              >
                <option value="" disabled className="text-gray-400">
                  Industry Sector
                </option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full py-4 text-lg font-semibold rounded-lg mt-8"
            >
              Submit to Sales
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default LeadModal;
