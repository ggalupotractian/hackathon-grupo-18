import React from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'

interface SalesContactModalProps {
  isOpen: boolean
  onClose: () => void
  totalSensors: number
  totalAssets: number
}

const SalesContactModal: React.FC<SalesContactModalProps> = ({ 
  isOpen, 
  onClose, 
  totalSensors, 
  totalAssets 
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-white rounded-lg shadow-xl">
        {/* Header */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Information Sent to Sales</h2>
          <p className="text-gray-600 mb-6">
            Your selection of <span className="font-semibold">{totalAssets} assets</span> requiring <span className="font-semibold text-blue-600">{totalSensors} sensors</span> has been sent to our sales team.
          </p>
          <p className="text-gray-600 mb-8">
            Our team will contact you soon with a customized quote and implementation plan for your operation.
          </p>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <Button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 font-semibold"
          >
            Got it, thanks!
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default SalesContactModal
