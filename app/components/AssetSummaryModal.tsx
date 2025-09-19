import React from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'

interface Asset {
  id: string
  model: string
  secondaryModel?: string
  manufacturer: string
  equipmentType: string
  estimatedSensors: number
}

interface AssetSummaryModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  selectedAssets: Asset[]
  assetQuantities: Record<string, number>
  equipmentTypes: Array<{ value: string; label: string }>
}

const AssetSummaryModal: React.FC<AssetSummaryModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  selectedAssets, 
  assetQuantities,
  equipmentTypes 
}) => {
  if (!isOpen) return null

  // Pricing constants
  const SENSOR_PRICE = 600.00
  const RECEIVER_PRICE = 700.00

  // Calculate totals
  const totalAssets = Object.values(assetQuantities).reduce((sum, qty) => sum + qty, 0)
  const totalSensors = selectedAssets.reduce((sum, asset) => {
    const quantity = assetQuantities[asset.id] || 0
    return sum + (asset.estimatedSensors * quantity)
  }, 0)
  
  // Calculate pricing
  const sensorsSubtotal = totalSensors * SENSOR_PRICE
  const totalPrice = sensorsSubtotal + RECEIVER_PRICE

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-3xl bg-white rounded-lg shadow-xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Asset Selection Summary</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-light"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{totalAssets}</div>
              <div className="text-blue-800">Total Assets Selected</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{totalSensors}</div>
              <div className="text-blue-800">Sensors Required</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">${totalPrice.toFixed(2)}</div>
              <div className="text-green-800">Estimated Total Cost</div>
            </div>
          </div>

          {/* Asset List */}
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Assets</h3>
          <div className="space-y-3">
            {selectedAssets.map((asset) => {
              const quantity = assetQuantities[asset.id] || 0
              const totalSensorsForAsset = asset.estimatedSensors * quantity
              
              return (
                <div key={asset.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{asset.model}</div>
                      {asset.secondaryModel && (
                        <div className="text-sm text-gray-500">{asset.secondaryModel}</div>
                      )}
                      <div className="text-sm text-gray-600 mt-1">
                        {asset.manufacturer} • {
                          equipmentTypes.find(type => type.value === asset.equipmentType)?.label || asset.equipmentType
                        }
                      </div>
                    </div>
                      <div className="text-right ml-4">
                        <div className="font-semibold text-gray-900">Qty: {quantity}</div>
                        <div className="text-sm text-gray-600">
                          {asset.estimatedSensors} sensors each
                        </div>
                        <div className="text-sm font-medium text-blue-600">
                          {totalSensorsForAsset} sensors total
                        </div>
                        <div className="text-sm font-bold text-green-600">
                          ${(totalSensorsForAsset * SENSOR_PRICE).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                      </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          {/* Pricing Breakdown */}
          <div className="mb-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Sensors ({totalSensors} × ${SENSOR_PRICE.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})</span>
              <span className="font-medium">${sensorsSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Receiver (1×)</span>
              <span className="font-medium">${RECEIVER_PRICE.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="border-t border-gray-300 pt-2">
              <div className="flex justify-between text-lg font-bold">
                <span className="text-gray-900">Total Cost</span>
                <span className="text-green-600">${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {totalAssets} assets • {totalSensors} sensors
            </div>
            <div className="flex space-x-3">
              <Button
                onClick={onClose}
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 py-2 px-6"
              >
                Back
              </Button>
              <Button
                onClick={onConfirm}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6"
              >
                {totalSensors > 20 ? 'Get Quote' : 'Proceed to Checkout'}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default AssetSummaryModal
