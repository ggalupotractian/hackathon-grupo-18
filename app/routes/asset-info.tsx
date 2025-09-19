import React, { useState, useMemo } from 'react'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { useNavigate } from 'react-router'
import AssetSummaryModal from '../components/AssetSummaryModal'
import SalesContactModal from '../components/SalesContactModal'

interface Asset {
    id: string
    model: string
    secondaryModel?: string
    manufacturer: string
    equipmentType: string
    estimatedSensors: number
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
        estimatedSensors: 2
    },
    {
        id: 'usm-t10p3e',
        model: 'T10P3E',
        secondaryModel: 'T10P3E',
        manufacturer: 'U.S. Motors',
        equipmentType: 'AC_motors',
        estimatedSensors: 3
    },
    {
        id: 'usm-k10p2e',
        model: 'K10P2E',
        manufacturer: 'U.S. Motors',
        equipmentType: 'AC_motors',
        estimatedSensors: 2
    },

    // Toshiba Motors
    {
        id: 'toshiba-eqp3',
        model: 'EQP3-1836T',
        manufacturer: 'Toshiba',
        equipmentType: 'AC_motors',
        estimatedSensors: 3
    },
    {
        id: 'toshiba-eqp3-215t',
        model: 'EQP3-2156T',
        manufacturer: 'Toshiba',
        equipmentType: 'AC_motors',
        estimatedSensors: 3
    },
    {
        id: 'toshiba-b3-184t',
        model: 'B3-0184TEFC3B',
        manufacturer: 'Toshiba',
        equipmentType: 'AC_motors',
        estimatedSensors: 2
    },

    // Baldor-Reliance Motors
    {
        id: 'vxl051522',
        model: 'VXL051522',
        secondaryModel: 'VXL051522',
        manufacturer: 'Baldor-Reliance',
        equipmentType: 'AC_motors',
        estimatedSensors: 4
    },
    {
        id: 'vxm050542-5',
        model: 'VXM050542-5',
        secondaryModel: 'VXM050542-5',
        manufacturer: 'Baldor-Reliance',
        equipmentType: 'AC_motors',
        estimatedSensors: 4
    },
    {
        id: 'xl141522t',
        model: 'XL141522T',
        secondaryModel: 'XL141522T',
        manufacturer: 'Baldor-Reliance',
        equipmentType: 'AC_motors',
        estimatedSensors: 2
    },

    // Volvo Construction Equipment
    {
        id: 'volvo-ec220e',
        model: 'EC220E',
        manufacturer: 'Volvo Construction',
        equipmentType: 'compressors',
        estimatedSensors: 4
    },
    {
        id: 'volvo-l60h',
        model: 'L60H',
        manufacturer: 'Volvo Construction',
        equipmentType: 'pumps',
        estimatedSensors: 3
    },
    {
        id: 'volvo-a40g',
        model: 'A40G',
        manufacturer: 'Volvo Construction',
        equipmentType: 'pumps',
        estimatedSensors: 3
    },

    // NPK Construction Equipment
    {
        id: 'npk-e225',
        model: 'E-225',
        manufacturer: 'NPK',
        equipmentType: 'compressors',
        estimatedSensors: 3
    },
    {
        id: 'npk-gf4',
        model: 'GF-4',
        manufacturer: 'NPK',
        equipmentType: 'gearboxes',
        estimatedSensors: 2
    },

    // LeeBoy Construction
    {
        id: 'leeboy-8515',
        model: '8515',
        manufacturer: 'LeeBoy',
        equipmentType: 'pumps',
        estimatedSensors: 2
    },
    {
        id: 'leeboy-1000',
        model: '1000T',
        manufacturer: 'LeeBoy',
        equipmentType: 'compressors',
        estimatedSensors: 3
    },

    // Morbark Wood Processing
    {
        id: 'morbark-3800',
        model: '3800',
        manufacturer: 'Morbark',
        equipmentType: 'gearboxes',
        estimatedSensors: 1
    },
    {
        id: 'morbark-950',
        model: '950 Tub Grinder',
        manufacturer: 'Morbark',
        equipmentType: 'bearings',
        estimatedSensors: 1
    },

    // Astec Industries
    {
        id: 'astec-dbl120',
        model: 'DBL120',
        manufacturer: 'Astec',
        equipmentType: 'pumps',
        estimatedSensors: 2
    },
    {
        id: 'astec-rt60',
        model: 'RT-60',
        manufacturer: 'Astec',
        equipmentType: 'fans',
        estimatedSensors: 1
    },

    // ASV Construction Equipment
    {
        id: 'asv-rt75',
        model: 'RT-75',
        manufacturer: 'ASV',
        equipmentType: 'pumps',
        estimatedSensors: 2
    },
    {
        id: 'asv-vh100',
        model: 'VH100',
        manufacturer: 'ASV',
        equipmentType: 'gearboxes',
        estimatedSensors: 1
    },

    // Manitowoc Cranes
    {
        id: 'manitowoc-999',
        model: '999',
        manufacturer: 'Manitowoc',
        equipmentType: 'gearboxes',
        estimatedSensors: 2
    },
    {
        id: 'manitowoc-2250',
        model: '2250',
        manufacturer: 'Manitowoc',
        equipmentType: 'pumps',
        estimatedSensors: 3
    },

    // Shuttlewagon Mobile Railcar Movers
    {
        id: 'sw-3000',
        model: 'SW3000',
        manufacturer: 'Shuttlewagon',
        equipmentType: 'gearboxes',
        estimatedSensors: 2
    },
    {
        id: 'sw-1500',
        model: 'SW1500',
        manufacturer: 'Shuttlewagon',
        equipmentType: 'pumps',
        estimatedSensors: 2
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
    const [showSummaryModal, setShowSummaryModal] = useState(false)
    const [showSalesModal, setShowSalesModal] = useState(false)

    // Filter assets based on search and filters
    const filteredAssets = useMemo(() => {
        return MOCK_ASSETS.filter(asset => {
            const matchesSearch = searchTerm === '' ||
                asset.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                asset.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                EQUIPMENT_TYPES.find(type => type.value === asset.equipmentType)?.label.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesManufacturer = selectedManufacturer === '' ||
                asset.manufacturer === selectedManufacturer

            const matchesEquipmentType = selectedEquipmentType === '' ||
                asset.equipmentType === selectedEquipmentType

            return matchesSearch && matchesManufacturer && matchesEquipmentType
        })
    }, [searchTerm, selectedManufacturer, selectedEquipmentType])

    // Calculate total asset count
    const totalAssetCount = Object.values(assetQuantities).reduce((sum, quantity) => sum + quantity, 0)

    // Get selected assets for the modal
    const selectedAssets = useMemo(() => {
        return MOCK_ASSETS.filter(asset => assetQuantities[asset.id] > 0)
    }, [assetQuantities])

    // Calculate total sensors needed
    const totalSensorsNeeded = useMemo(() => {
        return selectedAssets.reduce((total, asset) => {
            const quantity = assetQuantities[asset.id] || 0
            return total + (asset.estimatedSensors * quantity)
        }, 0)
    }, [selectedAssets, assetQuantities])

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
        setShowSummaryModal(true)
    }

    const handleModalClose = () => {
        setShowSummaryModal(false)
    }

    const handleModalConfirm = () => {
        setShowSummaryModal(false)

        if (totalSensorsNeeded > 20) {
            // Show sales contact modal for high sensor count
            setShowSalesModal(true)
            console.log('High sensor count - sending to sales team:', {
                totalSensors: totalSensorsNeeded,
                totalAssets: totalAssetCount,
                selectedAssets,
                assetQuantities
            })
        } else {
            // Proceed to checkout for low sensor count
            const contactInfo = JSON.parse(localStorage.getItem('contactInfo') || '{"contactName":"","email":""}')
            console.log('Proceeding to checkout with:', {
                selectedAssets,
                assetQuantities,
                contactInfo,
                totalSensors: totalSensorsNeeded
            })

            navigate('/checkout', {
                state: {
                    selectedAssets,
                    assetQuantities,
                    contactInfo
                }
            })
        }
    }

    const handleSalesModalClose = () => {
        setShowSalesModal(false)
        // Navigate back to home after sales modal
        navigate('/')
    }

    return (
        <div className="h-screen bg-gray-50 p-4 flex">
            <Card className="w-full max-w-6xl mx-auto p-8 border border-gray-200 bg-white shadow-lg flex flex-col h-full">
                <div className="mb-8">

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
                <div className="flex-1 bg-white shadow-sm border border-gray-200 rounded-lg mb-6 overflow-hidden flex flex-col">
                    <div className="flex-1 overflow-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                                <tr>
                                    <th className="text-left p-4 font-medium text-gray-700">Model</th>
                                    <th className="text-left p-4 font-medium text-gray-700">Manufacturer</th>
                                    <th className="text-left p-4 font-medium text-gray-700">Equipment Type</th>
                                    <th className="text-center p-4 font-medium text-gray-700">Estimated Sensors</th>
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
                                        <td className="p-4 text-gray-900 text-center font-semibold">{asset.estimatedSensors}</td>
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
                        <div className="text-center py-12 text-gray-500 flex-1 flex items-center justify-center">
                            <p>No assets found matching your criteria.</p>
                        </div>
                    )}
                </div>

                {/* Next Button */}
                <div className="mt-3 flex justify-between">
                    <Button
                        onClick={() => navigate('/company-info')}
                        className="bg-gray-100 text-gray-700 hover:bg-gray-200 py-3  px-8 text-xl font-semibold"
                    >
                        <span>← Back</span>
                    </Button>
                    <Button
                        onClick={handleNext}
                        disabled={totalAssetCount === 0}
                        className={`py-3 px-8 text-lg font-semibold flex items-center space-x-3 transition-all ${totalAssetCount === 0
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                    >
                        <span>Next ({totalAssetCount}/20)</span>
                        <span className="text-xl">→</span>
                    </Button>
                </div>

                {/* Asset Summary Modal */}
                <AssetSummaryModal
                    isOpen={showSummaryModal}
                    onClose={handleModalClose}
                    onConfirm={handleModalConfirm}
                    selectedAssets={selectedAssets}
                    assetQuantities={assetQuantities}
                    equipmentTypes={EQUIPMENT_TYPES}
                />

                {/* Sales Contact Modal */}
                <SalesContactModal
                    isOpen={showSalesModal}
                    onClose={handleSalesModalClose}
                    totalSensors={totalSensorsNeeded}
                    totalAssets={totalAssetCount}
                />
            </Card>
        </div>
    )
}
