import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductDetails from '../components/ProductDetails'
import { useParams } from 'react-router-dom'
import { productData } from '../static/data'
import SuggestedProducts from '../components/SuggestedProducts'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProductsShop } from '../redux/actions/product'

const ProductDetailsPage = () => {
    const { name } = useParams()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    
    // Get products from Redux store
    const { products: reduxProducts } = useSelector((state) => state.product)
    const { seller } = useSelector((state) => state.seller)
    const dispatch = useDispatch()
    
    const productName = name.replace(/-/g, " ")

    useEffect(() => {
        const findProduct = () => {
            setLoading(true)
            
            // First, try to find in Redux store (dashboard products)
            let foundProduct = null
            
            if (reduxProducts && reduxProducts.length > 0) {
                foundProduct = reduxProducts.find((product) => 
                    product.name === productName
                )
                console.log('🔍 Found in Redux store:', foundProduct)
            }
            
            // If not found in Redux, search in static data (homepage products)
            if (!foundProduct) {
                foundProduct = productData.find((product) => 
                    product.name === productName
                )
                console.log('🔍 Found in static data:', foundProduct)
            }
            
            setData(foundProduct)
            setLoading(false)
        }

        findProduct()
    }, [productName, reduxProducts])

    // Load seller products if seller exists but no products in Redux
    useEffect(() => {
        if (seller?._id && (!reduxProducts || reduxProducts.length === 0)) {
            console.log('🔄 Loading seller products for product search...')
            dispatch(getAllProductsShop(seller._id))
        }
    }, [seller, reduxProducts, dispatch])

    if (loading) {
        return (
            <>
                <Header />
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
                <Footer />
            </>
        )
    }
    
    return (
        <>
            <Header />
            {data ? (
                <>
                    <ProductDetails data={data} />
                    <SuggestedProducts data={data} />
                </>
            ) : (
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
                        <p className="text-gray-600">
                            The product "{productName}" could not be found.
                        </p>
                    </div>
                </div>
            )}
            <Footer />
        </>
    )
}

export default ProductDetailsPage