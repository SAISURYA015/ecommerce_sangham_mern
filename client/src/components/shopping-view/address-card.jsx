import { Button } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Label } from "../ui/label"



function AddressCard({ addressInfo, handleDeleteAddress, handleEditAddress }) {
  return (
    <Card>
      <CardContent className="grid gap-4">
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>Pincode: {addressInfo?.pincode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => handleEditAddress(addressInfo)} className="cursor-pointer">Edit</Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)} className="cursor-pointer">Delete</Button>
      </CardFooter>
    </Card>
  )
}

export default AddressCard