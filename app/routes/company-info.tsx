import React, { useState } from 'react'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { useNavigate } from 'react-router'

export default function CompanyInfo() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    companyName: '',
    cnpj: '',
    address: '',
    contactName: '',
    email: '',
    phone: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Company info submitted:', formData)
    // Navigate to asset information collection page
    navigate('/asset-info')
  }

  const formatCNPJ = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '')
    
    // Apply CNPJ mask: XX.XXX.XXX/XXXX-XX
    if (digits.length <= 2) return digits
    if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`
    if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`
    if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12, 14)}`
  }

  const handleCNPJChange = (value: string) => {
    const formatted = formatCNPJ(value)
    handleInputChange('cnpj', formatted)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-12 border border-gray-200 bg-white shadow-lg">
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-gray-600 mb-4"
          >
            ← Back
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Company Information</h1>
          <p className="text-gray-600 text-lg">
            Please provide your company details.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Company Name</label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700"
              required
            />
          </div>

          {/* CNPJ */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">CNPJ</label>
            <input
              type="text"
              value={formData.cnpj}
              onChange={(e) => handleCNPJChange(e.target.value)}
              placeholder="XX.XXX.XXX/XXXX-XX"
              maxLength={18}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700"
              required
            />
          </div>

          <hr className="my-8 border-gray-200" />

          {/* Contact Information */}
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Contact Name</label>
            <input
              type="text"
              value={formData.contactName}
              onChange={(e) => handleInputChange('contactName', e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700"
                required
              />
            </div>
          </div>

          {/* Next Button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-xl font-semibold flex items-center justify-center space-x-3 rounded-lg mt-8"
          >
            <span>Next</span>
            <span className="text-xl">→</span>
          </Button>
        </form>
      </Card>
    </div>
  )
}
