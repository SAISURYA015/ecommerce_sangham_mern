import Address from '@/components/shopping-view/address'
import img from '../../assets/account.jpg'
import { useSelector } from 'react-redux'
import UserCartItemsContent from '@/components/shopping-view/cart-items-content'
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

function ShoppingCheckout() {

  const { cartItems } = useSelector(state => state.shopCart);

  const totalCartAmount = cartItems && cartItems.items && cartItems.items.length > 0
    ? cartItems.items.reduce((sum, currentItem) => {
      const price = currentItem?.salePrice > 0 ? currentItem.salePrice : currentItem.price;
      return sum + price * currentItem?.quantity;
    }, 0)
    : 0;

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={img}
          className='h-full w-full object-cover object-center'
        />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5'>
        <Address />
        <div className='flex flex-col gap-4'>
          {
            cartItems && cartItems.items && cartItems.items.length > 0 ?
              cartItems.items.map(item => <UserCartItemsContent cartItem={item} />) : null
          }
          <Separator />
          <div className="space-y-4 px-6">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <Button className="w-full cursor-pointer">Checkout With Paypal</Button>
        </div>
        
      </div>
    </div>
  )
}

export default ShoppingCheckout