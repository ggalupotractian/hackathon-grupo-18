import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useNavigate } from "react-router";

export default function CompanyInfo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    contactName: "",
    email: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Contact info submitted:', formData)
    // Store contact info in localStorage for checkout
    localStorage.setItem('contactInfo', JSON.stringify(formData))
    // Navigate to asset information collection page
    navigate('/asset-info')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-12 border border-gray-200 bg-white shadow-lg">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact Information
          </h1>
          <p className="text-gray-600 text-lg">
            Please provide your contact details to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contact Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.contactName}
              onChange={(e) => handleInputChange("contactName", e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 pt-6">
            <Button
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 py-6 px-8 text-xl font-semibold rounded-lg"
              variant="outline"
            >
              ← Back
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-6 text-xl font-semibold flex items-center justify-center space-x-3 rounded-lg"
            >
              <span>Next</span>
              <span className="text-xl">→</span>
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
