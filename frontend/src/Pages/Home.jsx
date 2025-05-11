import React from 'react'
import Hero from '../Components/Layout/Hero'
import GenderCollectionSection from '../Components/Products/GenderCollectionSection'
import NewArrivals from '../Components/Products/NewArrivals'
import ProductDetails from '../Components/Products/ProductDetails'

const Home = () => {
  return (
    <div>
        <Hero/>
        <GenderCollectionSection/>
        <NewArrivals/>
        {/**Best seller */}
        <h2 className='text-4xl font-bold text-center text-gray-900 mb-14'>
          Best Seller
        </h2>
        <ProductDetails/>
    </div>
  )
}

export default Home