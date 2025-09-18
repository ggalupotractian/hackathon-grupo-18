import { ShoppingCart } from "lucide-react"
import { Button } from "./ui/button"

export function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-primary">TRACTIAN</div>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="sm">
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
