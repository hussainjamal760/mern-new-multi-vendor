import React from 'react'
import ShopDashboardPage from '../src/pages/ShopDashboardPage'
import ShopCreateProduct from '../src/pages/ShopCreateProduct'
import ShopAllProducts from '../src/pages/ShopAllProducts'

const ShopRoutes = () => {
  return (
    <>
    <ShopDashboardPage/>
    <ShopCreateProduct/>
    <ShopAllProducts/>
    </>
  )
}

export default ShopRoutes