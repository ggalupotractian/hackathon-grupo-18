import React, { useState, useMemo } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useNavigate } from "react-router";

interface Asset {
  id: string;
  model: string;
  secondaryModel?: string;
  manufacturer: string;
  equipmentType: string;
  contents: string;
}

// Mock asset database
const MOCK_ASSETS: Asset[] = [
  // Baldor-Reliance Motors
  {
    id: "vxl051522",
    model: "VXL051522",
    secondaryModel: "VXL051522",
    manufacturer: "Baldor-Reliance",
    equipmentType: "AC_motors",
    contents: "Explosion Proof General Purpose Motors",
  },
  {
    id: "vxm050542-5",
    model: "VXM050542-5",
    secondaryModel: "VXM050542-5",
    manufacturer: "Baldor-Reliance",
    equipmentType: "AC_motors",
    contents: "Explosion Proof General Purpose Motors",
  },
  {
    id: "vxm050742-5",
    model: "VXM050742-5",
    secondaryModel: "VXM050742-5",
    manufacturer: "Baldor-Reliance",
    equipmentType: "AC_motors",
    contents: "Explosion Proof General Purpose Motors",
  },
  {
    id: "xl141522t",
    model: "XL141522T",
    secondaryModel: "XL141522T",
    manufacturer: "Baldor-Reliance",
    equipmentType: "AC_motors",
    contents: "Explosion Proof General Purpose Motors",
  },

  // WEG Motors
  {
    id: "w22-182t",
    model: "W22-182T",
    manufacturer: "WEG",
    equipmentType: "AC_motors",
    contents: "High Efficiency Three Phase Motors",
  },
  {
    id: "w22-184t",
    model: "W22-184T",
    manufacturer: "WEG",
    equipmentType: "AC_motors",
    contents: "High Efficiency Three Phase Motors",
  },
  {
    id: "w21-213t",
    model: "W21-213T",
    manufacturer: "WEG",
    equipmentType: "AC_motors",
    contents: "Standard Efficiency Three Phase Motors",
  },

  // ABB Motors
  {
    id: "abb-m3bp160",
    model: "M3BP160",
    manufacturer: "ABB",
    equipmentType: "AC_motors",
    contents: "Premium Efficiency Motors",
  },
  {
    id: "abb-m3bp180",
    model: "M3BP180",
    manufacturer: "ABB",
    equipmentType: "AC_motors",
    contents: "Premium Efficiency Motors",
  },

  // Siemens Motors
  {
    id: "siemens-1le1",
    model: "1LE1001-1CB23",
    manufacturer: "Siemens",
    equipmentType: "AC_motors",
    contents: "General Purpose Three Phase Motors",
  },
  {
    id: "siemens-1le5",
    model: "1LE5003-1DB23",
    manufacturer: "Siemens",
    equipmentType: "AC_motors",
    contents: "High Efficiency Three Phase Motors",
  },

  // Pumps - Grundfos
  {
    id: "grundfos-cr15",
    model: "CR15-6",
    manufacturer: "Grundfos",
    equipmentType: "pumps",
    contents: "Centrifugal Multi-Stage Pumps",
  },
  {
    id: "grundfos-cr20",
    model: "CR20-8",
    manufacturer: "Grundfos",
    equipmentType: "pumps",
    contents: "Centrifugal Multi-Stage Pumps",
  },
  {
    id: "grundfos-nb50",
    model: "NB50-250/270",
    manufacturer: "Grundfos",
    equipmentType: "pumps",
    contents: "Single-Stage Close-Coupled Pumps",
  },

  // Pumps - KSB
  {
    id: "ksb-etanorm",
    model: "Etanorm 125-200",
    manufacturer: "KSB",
    equipmentType: "pumps",
    contents: "Standardized End Suction Pumps",
  },
  {
    id: "ksb-multitec",
    model: "Multitec 40-8",
    manufacturer: "KSB",
    equipmentType: "pumps",
    contents: "Horizontal Multistage High-Pressure Pumps",
  },

  // Compressors - Atlas Copco
  {
    id: "atlas-ga30",
    model: "GA30VSD+",
    manufacturer: "Atlas Copco",
    equipmentType: "compressors",
    contents: "Variable Speed Drive Air Compressors",
  },
  {
    id: "atlas-ga45",
    model: "GA45VSD+",
    manufacturer: "Atlas Copco",
    equipmentType: "compressors",
    contents: "Variable Speed Drive Air Compressors",
  },
  {
    id: "atlas-xas68",
    model: "XAS68",
    manufacturer: "Atlas Copco",
    equipmentType: "compressors",
    contents: "Portable Diesel Air Compressors",
  },

  // Compressors - Kaeser
  {
    id: "kaeser-asd35",
    model: "ASD35",
    manufacturer: "Kaeser",
    equipmentType: "compressors",
    contents: "Rotary Screw Compressors",
  },
  {
    id: "kaeser-csd82",
    model: "CSD82",
    manufacturer: "Kaeser",
    equipmentType: "compressors",
    contents: "Two-Stage Rotary Screw Compressors",
  },

  // Fans - ebm-papst
  {
    id: "ebmpapst-a4e300",
    model: "A4E300-AP02-01",
    manufacturer: "ebm-papst",
    equipmentType: "fans",
    contents: "Axial Fans with External Rotor Motor",
  },
  {
    id: "ebmpapst-r4e400",
    model: "R4E400-AI26-05",
    manufacturer: "ebm-papst",
    equipmentType: "fans",
    contents: "Centrifugal Fans with Forward Curved Blades",
  },
];

const MANUFACTURERS = [
  ...new Set(MOCK_ASSETS.map((asset) => asset.manufacturer)),
].sort();

const EQUIPMENT_TYPES = [
  { value: "AC_motors", label: "AC Motors" },
  { value: "pumps", label: "Pumps" },
  { value: "compressors", label: "Compressors" },
  { value: "fans", label: "Fans" },
  { value: "gearboxes", label: "Gearboxes" },
  { value: "bearings", label: "Bearings" },
];

export default function AssetInfo() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [selectedEquipmentType, setSelectedEquipmentType] = useState("");
  const [selectedAssets, setSelectedAssets] = useState<Set<string>>(new Set());

  // Filter assets based on search and filters
  const filteredAssets = useMemo(() => {
    return MOCK_ASSETS.filter((asset) => {
      const matchesSearch =
        searchTerm === "" ||
        asset.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.contents.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesManufacturer =
        selectedManufacturer === "" ||
        asset.manufacturer === selectedManufacturer;

      const matchesEquipmentType =
        selectedEquipmentType === "" ||
        asset.equipmentType === selectedEquipmentType;

      return matchesSearch && matchesManufacturer && matchesEquipmentType;
    });
  }, [searchTerm, selectedManufacturer, selectedEquipmentType]);

  const handleAssetToggle = (assetId: string) => {
    const newSelected = new Set(selectedAssets);
    if (newSelected.has(assetId)) {
      newSelected.delete(assetId);
    } else {
      if (newSelected.size < 20) {
        // Limit to 20 assets
        newSelected.add(assetId);
      } else {
        alert("Maximum of 20 assets can be selected");
        return;
      }
    }
    setSelectedAssets(newSelected);
  };

  const handleNext = () => {
    if (selectedAssets.size === 0) {
      alert("Please select at least one asset");
      return;
    }
    console.log("Selected assets:", Array.from(selectedAssets));
    // TODO: Navigate to next step or submit
    console.log("Ready to proceed to next step");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl p-8 border border-gray-200 bg-white shadow-lg">
        <div className="mb-8">
          <button
            onClick={() => navigate("/company-info")}
            className="text-gray-400 hover:text-gray-600 mb-4"
          >
            ← Back
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Asset Selection
          </h1>
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
              {MANUFACTURERS.map((manufacturer) => (
                <option key={manufacturer} value={manufacturer}>
                  {manufacturer}
                </option>
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
              {EQUIPMENT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2 flex justify-end items-center">
            <div className="bg-blue-600 text-white px-3 py-3 rounded-lg flex items-center space-x-2">
              <span className="text-sm">Selected</span>
              <span className="bg-white text-blue-600 px-2 py-1 rounded font-bold text-sm">
                {selectedAssets.size}
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
                  <th className="text-left p-4 font-medium text-gray-700">
                    Model
                  </th>
                  <th className="text-left p-4 font-medium text-gray-700">
                    Manufacturer
                  </th>
                  <th className="text-left p-4 font-medium text-gray-700">
                    Equipment Type
                  </th>
                  <th className="text-left p-4 font-medium text-gray-700">
                    Contents
                  </th>
                  <th className="text-left p-4 font-medium text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">
                          NO IMAGE
                          <br />
                          AVAILABLE
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {asset.model}
                          </div>
                          {asset.secondaryModel && (
                            <div className="text-sm text-gray-500">
                              {asset.secondaryModel}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-900">{asset.manufacturer}</td>
                    <td className="p-4 text-gray-900">
                      {EQUIPMENT_TYPES.find(
                        (type) => type.value === asset.equipmentType
                      )?.label || asset.equipmentType}
                    </td>
                    <td className="p-4 text-gray-700">{asset.contents}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleAssetToggle(asset.id)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          selectedAssets.has(asset.id)
                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                            : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                        }`}
                      >
                        {selectedAssets.has(asset.id)
                          ? "− Remove"
                          : "+ Add Asset"}
                      </button>
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
        {selectedAssets.size > 0 && (
          <div className="mt-8 flex justify-end">
            <Button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 text-lg font-semibold flex items-center space-x-3"
            >
              <span>Next ({selectedAssets.size}/20)</span>
              <span className="text-xl">→</span>
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
