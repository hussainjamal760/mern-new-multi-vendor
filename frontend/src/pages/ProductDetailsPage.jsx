import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductDetails from '../components/ProductDetails'
import { useParams } from 'react-router-dom'
import { productData } from '../static/data'

const ProductDetailsPage = () => {
    const {name} = useParams()
    const [data,setData] = useState(null);
    const productName = name.replace(/-/g ," ")

    useEffect(() => {
        const data = productData.find((i)=>i.name === productName)
        setData(data)
    }, [])
    
  return (
    <>
    <Header/>
    <ProductDetails data={data}/>
    <Footer/>
    </>
  )
}

export default ProductDetailsPage