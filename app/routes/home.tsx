import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router";
import LeadModal from "../components/LeadModal";

export default function Home() {
  const navigate = useNavigate();
  const [assetCount, setAssetCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const assetRanges = ["0 - 20", "20 - 50", "50 - 150", "150 - 300", "300+"];

  const handleNext = () => {
    if (assetCount === 0) {
      navigate("/company-info");
      return;
    }

    setIsModalOpen(true);
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center p-4" style={{ height: 'calc(100vh - 65px)' }}>
      <Card className="w-full max-w-2xl p-12 border border-gray-200 bg-white shadow-lg">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">
          Get Custom Quote
        </h1>

        <div className="space-y-12">
          <div>
            <label className="block text-gray-600 text-xl font-medium mb-8">
              How many assets run in your operation?
            </label>
            <div className="relative">
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
                    className={`${
                      assetCount === index
                        ? "text-blue-600 font-semibold"
                        : "text-gray-500"
                    } transition-colors duration-200`}
                  >
                    {range}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <Button
            onClick={handleNext}
            className="w-full py-6 text-xl font-semibold flex items-center justify-center space-x-3 mt-12 rounded-lg shadow-sm"
          >
            <span>Next</span>
            <span className="text-xl">→</span>
          </Button>
        </div>
      </Card>

      <LeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        assetRange={assetRanges[assetCount]}
      />
    </div>
  );
}
