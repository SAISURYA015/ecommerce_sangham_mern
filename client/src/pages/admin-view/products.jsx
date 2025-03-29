import ProductImageUpload from "@/components/admin-view/image-upload"
import AdminProductTile from "@/components/admin-view/product-tile"
import CommonForm from "@/components/common/form"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { addProductFormElements } from "@/config"
import { addNewProduct, deleteProduct, editProduct, fecthAllProducts } from "@/store/admin/product-slice"
import { Item } from "@radix-ui/react-select"
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"


function AdminProducts() {

  const initialFormData = {
    image: null,
    title: '',
    description: '',
    category: '',
    brand: '',
    price: '',
    salePrice: '',
    totalStock: '',
  }

  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);


  const { productList } = useSelector(state => state.adminProducts)
  const dispatch = useDispatch()

  function onSubmit(event) {
    event.preventDefault();

    currentEditedId !== null ? dispatch(editProduct({
      id: currentEditedId, formData
    })).then((data) => {
      console.log(data, 'edit product')

      if (data?.payload.success) {
        dispatch(fecthAllProducts());
        setFormData(initialFormData)
        setOpenCreateProductsDialog(false)
        setCurrentEditedId(null)
      }

    }

    ) : dispatch(addNewProduct({
      ...formData,
      image: uploadedImageUrl
    })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fecthAllProducts());
        setOpenCreateProductsDialog(false);
        setImageFile(null),
          setFormData(initialFormData);
      }
    }

    )

  }

  function isFormValid() {
    return Object.keys(formData)
      .map(key => formData[key] !== '')
      .every(item => item)
  }

  function handleDelete(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(deleteProduct(getCurrentProductId)).then(data => {
      if (data?.payload?.success) {
        dispatch(fecthAllProducts());
      }
    })
  }

  useEffect(() => {
    dispatch(fecthAllProducts())
  }, [dispatch]);

  console.log('productList', uploadedImageUrl, productList)

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {
          productList && productList.length > 0 ?
            productList.map(productItem => <AdminProductTile
              product={productItem}
              setOpenCreateProductsDialog={setOpenCreateProductsDialog}
              setCurrentEditedId={setCurrentEditedId}
              setFormData={setFormData}
              handleDelete={handleDelete}
            />) : null
        }
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData)
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? 'Edit Product' : 'Add New Product'}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6 px-6">
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? 'Edit' : 'Add New Product'}
              onSubmit={onSubmit}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default AdminProducts