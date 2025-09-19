import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { Header } from "@/components/header";
import { useNavigate, useLocation } from "react-router";

interface Asset {
  id: string
  model: string
  secondaryModel?: string
  manufacturer: string
  equipmentType: string
  estimatedSensors: number
}

interface CheckoutState {
  selectedAssets: Asset[]
  assetQuantities: Record<string, number>
  contactInfo: {
    contactName: string
    email: string
  }
}

const EQUIPMENT_TYPES = [
  { value: 'AC_motors', label: 'AC Motors' },
  { value: 'pumps', label: 'Pumps' },
  { value: 'compressors', label: 'Compressors' },
  { value: 'fans', label: 'Fans' },
  { value: 'gearboxes', label: 'Gearboxes' },
  { value: 'bearings', label: 'Bearings' }
]

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get data from navigation state
  const checkoutData = location.state as CheckoutState | null;
  console.log(checkoutData);
  
  // Sensor pricing
  const SENSOR_PRICE = 600.00;

  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [isLoadingPurchase, setIsLoadingPurchase] = useState(false);

  // Calculate totals
  const totalSensors = checkoutData?.selectedAssets.reduce((sum, asset) => {
    const quantity = checkoutData.assetQuantities[asset.id] || 0;
    return sum + (asset.estimatedSensors * quantity);
  }, 0) || 0;
  
  const totalAssets = checkoutData ? Object.values(checkoutData.assetQuantities).reduce((sum, qty) => sum + qty, 0) : 0;
  const subtotal = totalSensors * SENSOR_PRICE;
  const receiverCost = 700.00; // Base receiver cost
  const total = subtotal + receiverCost;

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpirationDate = (value: string) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      // 16 digits + 3 spaces
      setCardNumber(formatted);
    }
  };

  const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpirationDate(e.target.value);
    if (formatted.length <= 5) {
      // MM/YY
      setExpirationDate(formatted);
    }
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      setCvc(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingPurchase(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log({
      cardholderName,
      cardNumber: cardNumber.replace(/\s/g, ""),
      expirationDate,
      cvc,
    });

    navigate("/purchase-completed");
  };

  return (
    <>
      <Header />

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Card variant="elevated">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-blue-600" />
                    <h2 className="text-xl font-semibold">Payment Details</h2>
                  </div>
                  <p className="text-sm text-gray-600">
                    Your information is secure and encrypted
                  </p>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        type="text"
                        placeholder="John Doe"
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength={19}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expirationDate">Expiration Date</Label>
                        <Input
                          id="expirationDate"
                          type="text"
                          placeholder="MM/YY"
                          value={expirationDate}
                          onChange={handleExpirationChange}
                          maxLength={5}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input
                          id="cvc"
                          type="text"
                          placeholder="123"
                          value={cvc}
                          onChange={handleCvcChange}
                          maxLength={4}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      isLoading={isLoadingPurchase}
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      Complete Payment
                    </Button>
                  </CardFooter>
                </form>
              </Card>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  Your payment information is encrypted and secure. We never
                  store your card details.
                </p>
              </div>
            </div>

            <div>
              <Card variant="elevated">
                <CardHeader>
                  <h2 className="text-xl font-semibold">Order Summary</h2>
                  <p className="text-sm text-gray-600">Review your purchase</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Sensor Information */}
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        Smart Trac Pro Sensors
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Advanced IoT sensors with real-time monitoring capabilities, 
                        temperature and humidity tracking for your selected assets
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          Quantity: {totalSensors}
                        </span>
                        <span className="font-medium">${SENSOR_PRICE.toFixed(2)} each</span>
                      </div>
                    </div>
                  </div>

                  {/* Selected Assets Details */}
                  {checkoutData && checkoutData.selectedAssets.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Selected Assets ({totalAssets} total):</h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {checkoutData.selectedAssets.map((asset) => {
                          const quantity = checkoutData.assetQuantities[asset.id] || 0;
                          const sensorsForAsset = asset.estimatedSensors * quantity;
                          
                          return (
                            <div key={asset.id} className="bg-gray-50 p-3 rounded-lg">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="font-medium text-sm text-gray-900">{asset.model}</div>
                                  <div className="text-xs text-gray-500">
                                    {asset.manufacturer} • {
                                      EQUIPMENT_TYPES.find(type => type.value === asset.equipmentType)?.label || asset.equipmentType
                                    }
                                  </div>
                                </div>
                                <div className="text-right ml-4">
                                  <div className="text-sm font-medium text-gray-900">×{quantity}</div>
                                  <div className="text-xs text-gray-500">{sensorsForAsset} sensors</div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="border-t border-gray-200"></div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Sensors ({totalSensors}×)</span>
                      <span className="text-sm">${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Receiver (1×)</span>
                      <span className="text-sm">${receiverCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2">
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <span>Total</span>
                        <span>${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  </div>

                  {/* Fallback for no data */}
                  {!checkoutData && (
                    <div className="text-center py-4 text-gray-500">
                      <p className="text-sm">No asset data found. Please return to asset selection.</p>
                      <Button 
                        onClick={() => navigate('/asset-info')} 
                        className="mt-2 text-sm bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Back to Asset Selection
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
