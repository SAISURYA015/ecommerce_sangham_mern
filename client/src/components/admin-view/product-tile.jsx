import { Button } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"



function AdminProductTile({ 
  product, 
  setFormData, 
  setCurrentEditedId, 
  setOpenCreateProductsDialog, 
  handleDelete,
}) {
  return (
    <Card className="w-full pt-0 max-w-sm mx-auto">
      <div> 
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[400px] rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-5">{product?.title}</h2>
          <p className="text-lg py-2 font-medium">{product?.description}</p>
          <div className="flex justify-between items-center mb-2">
            <span className={`${product?.salePrice > 0 ? 'line-through' : ''} text-lg font-semibold text-primary`}>${product?.price}</span>
            {
              product?.salePrice > 0 ? <span className="text-lg font-bold">${product?.salePrice}</span> : null
            }

          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button className="cursor-pointer" onClick={() => {
            setOpenCreateProductsDialog(true)
            setCurrentEditedId(product?._id)
            setFormData(product)
          }}>Edit</Button>  
          <Button className="cursor-pointer" onClick={()=>handleDelete(product?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  )
}

export default AdminProductTile