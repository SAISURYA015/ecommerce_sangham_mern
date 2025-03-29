import { Outlet } from "react-router-dom"
import ShoppingSideBar from "./sidebar"
import ShoppingHeader from "./header"




function ShoppingLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* shopping-sidebar */}
      {/* <ShoppingSideBar /> */}
      <div className="flex flex-1 flex-col">
        {/* shopping header */}
       <ShoppingHeader />
        <main className="flex flex-1 bg-muted p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default ShoppingLayout