import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Categories from '../components/Categories'

const HomePage = () => {
  return (
    <>
        <Header activeHeading={1}/>
        <Hero/>
        <Categories/>
    </>
  )
}

export default HomePage