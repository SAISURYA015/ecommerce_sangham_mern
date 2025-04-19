import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";


function UserCartWrapper({ cartItems, setOpenCartSheet }) {

  const navigate = useNavigate();

  const totalCartAmount = cartItems && cartItems.length > 0
    ? cartItems.reduce((sum, currentItem) => {
      const price = currentItem?.salePrice > 0 ? currentItem.salePrice : currentItem.price;
      return sum + price * currentItem?.quantity;
    }, 0)
    : 0;


  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader className="p-6">
        <SheetTitle>
          Your Cart
        </SheetTitle>
      </SheetHeader>
      <div className="space-y-4">
        {
          cartItems && cartItems.length > 0 ?
            cartItems.map(item => <UserCartItemsContent cartItem={item} />) : null
        }
      </div>
      <div className="space-y-4 px-6">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount}</span>
        </div>
      </div>
      <div className="px-6">
        <Button onClick={() => {
          navigate('/shop/checkout')
          setOpenCartSheet(false)
        }} className="w-full cursor-pointer">Checkout</Button>
      </div>

    </SheetContent>
  )
}

export default UserCartWrapper