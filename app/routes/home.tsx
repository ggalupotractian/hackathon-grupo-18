import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { useState } from "react"

export default function Home() {
  const [assetCount, setAssetCount] = useState(1) // Default to "50-100" range
  const [criticalPercentage, setCriticalPercentage] = useState(1) // Default to "10% to 20%" range

  const assetRanges = ["0 - 20", "20 - 50", "50 - 100", "100 - 150", "150 - 300", "300+"]
  const criticalRanges = ["0 to 10%", "10% to 20%", "30%+"]

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-12 border border-gray-200 bg-white shadow-lg">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">Get Custom Quote</h1>

        <div className="space-y-12">
          <div>
            <label className="block text-gray-600 text-xl font-medium mb-8">
              How many assets run in your operation?
            </label>
            <div className="relative">
              {/* Custom slider track */}
              <div className="relative h-2 bg-gray-200 rounded-full">
                <div
                  className="absolute h-2 bg-blue-600 rounded-full transition-all duration-200"
                  style={{ width: `${(assetCount / 4) * 100}%` }}
                />
                <div
                  className="absolute w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg transform -translate-y-2 transition-all duration-200 cursor-pointer"
                  style={{ left: `calc(${(assetCount / 4) * 100}% - 12px)` }}
                />
              </div>
              <input
                type="range"
                min="0"
                max="4"
                value={assetCount}
                onChange={(e) => setAssetCount(Number.parseInt(e.target.value))}
                className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
              />
              <div className="flex justify-between text-sm mt-4">
                {assetRanges.map((range, index) => (
                  <span
                    key={range}
                    className={`${assetCount === index ? "text-blue-600 font-semibold" : "text-gray-500"
                      } transition-colors duration-200`}
                  >
                    {range}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-600 text-xl font-medium mb-8">
              What percentage of your assets are critical to your operation?
            </label>
            <div className="relative">
              {/* Custom slider track */}
              <div className="relative h-2 bg-gray-200 rounded-full">
                <div
                  className="absolute h-2 bg-blue-600 rounded-full transition-all duration-200"
                  style={{ width: `${(criticalPercentage / 2) * 100}%` }}
                />
                <div
                  className="absolute w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg transform -translate-y-2 transition-all duration-200 cursor-pointer"
                  style={{ left: `calc(${(criticalPercentage / 2) * 100}% - 12px)` }}
                />
              </div>
              <input
                type="range"
                min="0"
                max="2"
                value={criticalPercentage}
                onChange={(e) => setCriticalPercentage(Number.parseInt(e.target.value))}
                className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
              />
              <div className="flex justify-between text-sm mt-4">
                {criticalRanges.map((range, index) => (
                  <span
                    key={range}
                    className={`${criticalPercentage === index ? "text-blue-600 font-semibold" : "text-gray-500"
                      } transition-colors duration-200`}
                  >
                    {range}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-xl font-semibold flex items-center justify-center space-x-3 mt-12 rounded-lg shadow-sm">
            <span>Next</span>
            <span className="text-xl">→</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}
