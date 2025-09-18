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

export default function Checkout() {
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [isLoadingPurchase, setIsLoadingPurchase] = useState(false);

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

    setIsLoadingPurchase(false);
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
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        Smart Monitoring Sensor
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Advanced IoT sensor with real-time monitoring
                        capabilities, temperature and humidity tracking
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          Quantity: 3
                        </span>
                        <span className="font-medium">$35.00 each</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200"></div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total</span>
                      <span>$105.00</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      3 × Smart Monitoring Sensor
                    </p>
                    <p className="text-sm text-gray-500">1 × Receiver</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
