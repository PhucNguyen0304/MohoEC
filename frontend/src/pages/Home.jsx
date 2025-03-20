import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import Hero from '../components/Hero.jsx'
import New from '../components/New.jsx'
import BestSeller from '../components/BestSeller.jsx'
import Partner from '../components/Partner.jsx'
import Policy from '../components/Policy.jsx'
import ArticleHome from '../components/ArticleHome.jsx'
const Home = () => {
  useEffect(()=> {
  },[])
  return (
    <>
    <Hero image1mb= {assets.hero_mb[0]} image2mb = {assets.hero_mb[1]} image3mb={assets.hero_mb[2]} image image1 = {assets.banner1} image2 = {assets.banner2} image3 = {assets.banner3}/>
    <New/>
    <BestSeller/>
    <Partner/>
    <ArticleHome/>
    <Policy/>
    </>
  )
}

export default Home
