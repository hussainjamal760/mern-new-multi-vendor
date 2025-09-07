import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import BestDeals from '../components/BestDeals'

const HomePage = () => {
  return (
    <>
        <Header activeHeading={1}/>
        <Hero/>
        <Categories/>
        <BestDeals/>
    </>
  )
}

export default HomePage