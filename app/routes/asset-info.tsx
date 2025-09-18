import React, { useState, useMemo } from 'react'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { useNavigate } from 'react-router'

interface Asset {
  id: string
  model: string
  secondaryModel?: string
  manufacturer: string
  equipmentType: string
  contents: string
}

// Mock asset database
const MOCK_ASSETS: Asset[] = [
  // U.S. Motors
  {
    id: 'usm-dp10p2e',
    model: 'DP10P2E',
    secondaryModel: 'DP10P2E',
    manufacturer: 'U.S. Motors',
    equipmentType: 'AC_motors',
    contents: 'Premium Efficient General Purpose Motors'
  },
  {
    id: 'usm-t10p3e',
    model: 'T10P3E',
    secondaryModel: 'T10P3E',
    manufacturer: 'U.S. Motors',
    equipmentType: 'AC_motors',
    contents: 'TEFC Premium Efficient Motors'
  },
  {
    id: 'usm-k10p2e',
    model: 'K10P2E',
    manufacturer: 'U.S. Motors',
    equipmentType: 'AC_motors',
    contents: 'Close-Coupled Pump Motors'
  },

  // Toshiba Motors
  {
    id: 'toshiba-eqp3',
    model: 'EQP3-1836T',
    manufacturer: 'Toshiba',
    equipmentType: 'AC_motors',
    contents: 'Premium Efficiency Three Phase Motors'
  },
  {
    id: 'toshiba-eqp3-215t',
    model: 'EQP3-2156T',
    manufacturer: 'Toshiba',
    equipmentType: 'AC_motors',
    contents: 'Premium Efficiency Three Phase Motors'
  },
  {
    id: 'toshiba-b3-184t',
    model: 'B3-0184TEFC3B',
    manufacturer: 'Toshiba',
    equipmentType: 'AC_motors',
    contents: 'High Efficiency TEFC Motors'
  },

  // Baldor-Reliance Motors
  {
    id: 'vxl051522',
    model: 'VXL051522',
    secondaryModel: 'VXL051522',
    manufacturer: 'Baldor-Reliance',
    equipmentType: 'AC_motors',
    contents: 'Explosion Proof General Purpose Motors'
  },
  {
    id: 'vxm050542-5',
    model: 'VXM050542-5',
    secondaryModel: 'VXM050542-5',
    manufacturer: 'Baldor-Reliance',
    equipmentType: 'AC_motors',
    contents: 'Explosion Proof General Purpose Motors'
  },
  {
    id: 'xl141522t',
    model: 'XL141522T',
    secondaryModel: 'XL141522T',
    manufacturer: 'Baldor-Reliance',
    equipmentType: 'AC_motors',
    contents: 'General Purpose TEFC Motors'
  },

  // Volvo Construction Equipment
  {
    id: 'volvo-ec220e',
    model: 'EC220E',
    manufacturer: 'Volvo Construction',
    equipmentType: 'compressors',
    contents: 'Hydraulic Excavator Main Pump'
  },
  {
    id: 'volvo-l60h',
    model: 'L60H',
    manufacturer: 'Volvo Construction',
    equipmentType: 'pumps',
    contents: 'Wheel Loader Hydraulic Pump'
  },
  {
    id: 'volvo-a40g',
    model: 'A40G',
    manufacturer: 'Volvo Construction',
    equipmentType: 'pumps',
    contents: 'Articulated Hauler Transmission Pump'
  },

  // NPK Construction Equipment
  {
    id: 'npk-e225',
    model: 'E-225',
    manufacturer: 'NPK',
    equipmentType: 'compressors',
    contents: 'Hydraulic Hammer Compressor Unit'
  },
  {
    id: 'npk-gf4',
    model: 'GF-4',
    manufacturer: 'NPK',
    equipmentType: 'gearboxes',
    contents: 'Vibratory Compactor Gearbox'
  },

  // LeeBoy Construction
  {
    id: 'leeboy-8515',
    model: '8515',
    manufacturer: 'LeeBoy',
    equipmentType: 'pumps',
    contents: 'Asphalt Paver Hydraulic Pump'
  },
  {
    id: 'leeboy-1000',
    model: '1000T',
    manufacturer: 'LeeBoy',
    equipmentType: 'compressors',
    contents: 'Asphalt Distributor Compressor'
  },

  // Morbark Wood Processing
  {
    id: 'morbark-3800',
    model: '3800',
    manufacturer: 'Morbark',
    equipmentType: 'gearboxes',
    contents: 'Wood Chipper Drive Gearbox'
  },
  {
    id: 'morbark-950',
    model: '950 Tub Grinder',
    manufacturer: 'Morbark',
    equipmentType: 'bearings',
    contents: 'Tub Grinder Main Bearing Assembly'
  },

  // Astec Industries
  {
    id: 'astec-dbl120',
    model: 'DBL120',
    manufacturer: 'Astec',
    equipmentType: 'pumps',
    contents: 'Hot Mix Plant Aggregate Pump'
  },
  {
    id: 'astec-rt60',
    model: 'RT-60',
    manufacturer: 'Astec',
    equipmentType: 'fans',
    contents: 'Asphalt Plant Baghouse Fan'
  },

  // ASV Construction Equipment
  {
    id: 'asv-rt75',
    model: 'RT-75',
    manufacturer: 'ASV',
    equipmentType: 'pumps',
    contents: 'Compact Track Loader Drive Pump'
  },
  {
    id: 'asv-vh100',
    model: 'VH100',
    manufacturer: 'ASV',
    equipmentType: 'gearboxes',
    contents: 'Posi-Track Drive Gearbox'
  },

  // Manitowoc Cranes
  {
    id: 'manitowoc-999',
    model: '999',
    manufacturer: 'Manitowoc',
    equipmentType: 'gearboxes',
    contents: 'Crawler Crane Swing Gearbox'
  },
  {
    id: 'manitowoc-2250',
    model: '2250',
    manufacturer: 'Manitowoc',
    equipmentType: 'pumps',
    contents: 'Crawler Crane Hydraulic Pump'
  },

  // Shuttlewagon Mobile Railcar Movers
  {
    id: 'sw-3000',
    model: 'SW3000',
    manufacturer: 'Shuttlewagon',
    equipmentType: 'gearboxes',
    contents: 'Mobile Railcar Mover Drive Gearbox'
  },
  {
    id: 'sw-1500',
    model: 'SW1500',
    manufacturer: 'Shuttlewagon',
    equipmentType: 'pumps',
    contents: 'Railcar Mover Hydraulic Pump'
  }
]

const MANUFACTURERS = [...new Set(MOCK_ASSETS.map(asset => asset.manufacturer))].sort()

const EQUIPMENT_TYPES = [
  { value: 'AC_motors', label: 'AC Motors' },
  { value: 'pumps', label: 'Pumps' },
  { value: 'compressors', label: 'Compressors' },
  { value: 'fans', label: 'Fans' },
  { value: 'gearboxes', label: 'Gearboxes' },
  { value: 'bearings', label: 'Bearings' }
]

export default function AssetInfo() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedManufacturer, setSelectedManufacturer] = useState('')
  const [selectedEquipmentType, setSelectedEquipmentType] = useState('')
  const [assetQuantities, setAssetQuantities] = useState<Record<string, number>>({})

  // Filter assets based on search and filters
  const filteredAssets = useMemo(() => {
    return MOCK_ASSETS.filter(asset => {
      const matchesSearch = searchTerm === '' || 
        asset.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.contents.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesManufacturer = selectedManufacturer === '' || 
        asset.manufacturer === selectedManufacturer
      
      const matchesEquipmentType = selectedEquipmentType === '' || 
        asset.equipmentType === selectedEquipmentType

      return matchesSearch && matchesManufacturer && matchesEquipmentType
    })
  }, [searchTerm, selectedManufacturer, selectedEquipmentType])

  // Calculate total asset count
  const totalAssetCount = Object.values(assetQuantities).reduce((sum, quantity) => sum + quantity, 0)

  const handleAddAsset = (assetId: string) => {
    if (totalAssetCount >= 20) {
      alert('Maximum of 20 assets can be selected')
      return
    }
    
    setAssetQuantities(prev => ({
      ...prev,
      [assetId]: 1
    }))
  }

  const handleQuantityChange = (assetId: string, change: number) => {
    setAssetQuantities(prev => {
      const currentQuantity = prev[assetId] || 0
      const newQuantity = currentQuantity + change
      
      if (newQuantity <= 0) {
        // Remove asset if quantity becomes 0 or negative
        const { [assetId]: removed, ...rest } = prev
        return rest
      } else if (totalAssetCount - currentQuantity + newQuantity > 20) {
        // Don't allow exceeding 20 total assets
        alert('Maximum of 20 assets can be selected')
        return prev
      } else {
        return {
          ...prev,
          [assetId]: newQuantity
        }
      }
    })
  }

  const handleNext = () => {
    if (totalAssetCount === 0) {
      alert('Please select at least one asset')
      return
    }
    console.log('Selected assets with quantities:', assetQuantities)
    // TODO: Navigate to next step or submit
    console.log('Ready to proceed to next step')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-6xl mx-auto mt-8 p-8 border border-gray-200 bg-white shadow-lg">
        <div className="mb-8">
          <button
            onClick={() => navigate('/company-info')}
            className="text-gray-400 hover:text-gray-600 mb-4"
          >
            ← Back
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Asset Selection</h1>
          <p className="text-gray-600 text-lg">
            Select the assets in your operation that you want to monitor.
          </p>
        </div>
        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
          <div className="md:col-span-6">
            <input
              type="text"
              placeholder="Search by Model, Manufacturer, Equipment Type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <select
              value={selectedManufacturer}
              onChange={(e) => setSelectedManufacturer(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            >
              <option value="">Manufacturer</option>
              {MANUFACTURERS.map(manufacturer => (
                <option key={manufacturer} value={manufacturer}>{manufacturer}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <select
              value={selectedEquipmentType}
              onChange={(e) => setSelectedEquipmentType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            >
              <option value="">Equipment type</option>
              {EQUIPMENT_TYPES.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2 flex justify-end items-center">
            <div className="bg-blue-600 text-white px-3 py-3 rounded-lg flex items-center space-x-2">
              <span className="text-sm">Selected</span>
              <span className="bg-white text-blue-600 px-2 py-1 rounded font-bold text-sm">
                {totalAssetCount}
              </span>
            </div>
          </div>
        </div>

        {/* Assets Table */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-700">Model</th>
                  <th className="text-left p-4 font-medium text-gray-700">Manufacturer</th>
                  <th className="text-left p-4 font-medium text-gray-700">Equipment Type</th>
                  <th className="text-left p-4 font-medium text-gray-700">Contents</th>
                  <th className="text-left p-4 font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((asset) => (
                  <tr key={asset.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-medium text-gray-900">{asset.model}</div>
                          {asset.secondaryModel && (
                            <div className="text-sm text-gray-500">{asset.secondaryModel}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-900">{asset.manufacturer}</td>
                    <td className="p-4 text-gray-900">
                      {EQUIPMENT_TYPES.find(type => type.value === asset.equipmentType)?.label || asset.equipmentType}
                    </td>
                    <td className="p-4 text-gray-700">{asset.contents}</td>
                    <td className="p-4">
                      {assetQuantities[asset.id] ? (
                        // Quantity controls
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(asset.id, -1)}
                            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-bold transition-all"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-semibold text-gray-900">
                            {assetQuantities[asset.id]}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(asset.id, 1)}
                            className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-blue-600 font-bold transition-all"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        // Add button
                        <button
                          onClick={() => handleAddAsset(asset.id)}
                          className="px-4 py-2 rounded-lg font-medium transition-all bg-blue-50 text-blue-700 hover:bg-blue-100"
                        >
                          + Add Asset
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredAssets.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>No assets found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Next Button */}
        {totalAssetCount > 0 && (
          <div className="mt-8 flex justify-end">
            <Button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 text-lg font-semibold flex items-center space-x-3"
            >
              <span>Next ({totalAssetCount}/20)</span>
              <span className="text-xl">→</span>
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
