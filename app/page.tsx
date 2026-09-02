import React from 'react'
import {HeroSlider} from "../components/home/HeroSlider"
import { FeaturedCategories } from '@/components/home/FeaturedCategories'
const HomePage = () => {
  return (
    <div>
      <HeroSlider/>
      <FeaturedCategories/>
    </div>
  )
}

export default HomePage