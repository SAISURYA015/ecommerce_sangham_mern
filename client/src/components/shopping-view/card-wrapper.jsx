import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";


function UserCartWrapper() {
  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader className="p-6">
        <SheetTitle>
          Your Cart
        </SheetTitle>
      </SheetHeader>
      <div className="space-y-4"></div>
      <div className="space-y-4 px-6">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">$1000</span>
        </div>
      </div>
      <div className="px-6">
        <Button className="w-full">Checkout</Button>
      </div>
      
    </SheetContent>
  )
}

export default UserCartWrapper