import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Truck, Home, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PurchaseCompleted() {
  const timelineSteps = [
    {
      id: 1,
      title: "Order Confirmed",
      description: "Your payment has been processed successfully",
      status: "completed",
      icon: CheckCircle,
      date: "Just now",
    },
    {
      id: 2,
      title: "Processing",
      description: "Your sensors are being prepared for shipment",
      status: "active",
      icon: Package,
      date: null,
    },
    {
      id: 3,
      title: "Shipped",
      description: "Your package is on its way to your address",
      status: "pending",
      icon: Truck,
      date: null,
    },
    {
      id: 4,
      title: "Delivered",
      description: "Your Smart Monitoring Sensors will arrive at your doorstep",
      status: "pending",
      icon: Home,
      date: "5-7 business days",
    },
  ];

  return (
    <>
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div>
              <Card variant="elevated">
                <CardHeader className="flex justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-6 w-6 text-blue-600" />
                      <h2 className="text-2xl font-semibold text-blue-600">
                        Purchase Completed!
                      </h2>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Thank you for your purchase. Your Smart Monitoring Sensors
                      are on their way!
                    </p>
                  </div>

                  <Button variant="link">Download receipt</Button>
                </CardHeader>

                <CardContent className="space-y-8">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-blue-600">
                          Order #SM-2024-001
                        </p>
                        <p className="text-sm text-gray-600">
                          We sent a confirmation email to your registered
                          address
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Delivery Timeline
                    </h3>

                    <div className="relative">
                      {timelineSteps.map((step, index) => {
                        const Icon = step.icon;
                        const isCompleted = step.status === "completed";
                        const isActive = step.status === "active";
                        const isLast = index === timelineSteps.length - 1;

                        return (
                          <div
                            key={step.id}
                            className="relative flex items-start"
                          >
                            {!isLast && (
                              <div
                                className={cn(
                                  "absolute left-4 top-8 w-0.5 h-16 bg-gray-300",
                                  isActive || (isCompleted && "bg-blue-500")
                                )}
                              />
                            )}

                            <div
                              className={cn(
                                "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-white border-gray-300 text-gray-400",
                                (isCompleted || isActive) &&
                                  "bg-blue-500 border-blue-500 text-white"
                              )}
                            >
                              <Icon className="h-4 w-4" />
                            </div>

                            <div className="ml-4 flex-1 pb-8">
                              <div className="flex items-center justify-between">
                                <h4
                                  className={cn(
                                    "text-sm font-medium text-gray-500",
                                    (isCompleted || isActive) && "text-blue-600"
                                  )}
                                >
                                  {step.title}
                                </h4>
                                {step.date && (
                                  <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <Clock className="h-3 w-3" />
                                    {step.date}
                                  </div>
                                )}
                              </div>
                              <p
                                className={cn(
                                  "text-sm text-gray-500",
                                  (isCompleted || isActive) && "text-blue-600"
                                )}
                              >
                                {step.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
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
