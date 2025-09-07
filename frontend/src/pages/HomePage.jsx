import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import BestDeals from '../components/BestDeals'
import FeaturedProduct from '../components/FeaturedProduct'
import Events from '../components/Events'
import Sponsored from '../components/Sponsered'

const HomePage = () => {
  return (
    <>
        <Header activeHeading={1}/>
        <Hero/>
        <Categories/>
        <BestDeals/>
        <Events/>
        <FeaturedProduct/>
        <Sponsored/>
    </>
  )
}

export default HomePage