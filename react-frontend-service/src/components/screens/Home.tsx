import React from 'react'
import { Container } from '@mui/material'

import Footer from '../Footer/Footer'
import Feedback from '../Home/Feedback'
import ShoppingCategory from '../Home/ShoppingCategory'
import FeaturedNewest from '../Home/FeaturedNewest'
import TopRanking from '../Home/TopRanking'
import Carousel from '../Home/Carousel'
import { Product } from '../../redux/types/Types'
import { useAppSelector } from '../../hooks/reduxHooks'

type HomeProp = {
  data: Array<Product>
}

const Home = ({ data }: HomeProp) => {
  const language = useAppSelector((state) => state.language.language)

  let randomNumber = Math.floor(Math.random() * data.length - 5 + 1)

  const topRanking = data.slice(
    randomNumber < 0 ? 0 : randomNumber,
    randomNumber < 0 ? 0 + 5 : randomNumber + 5
  )
  return (
    /*

    Layout:
      Carousel
      Shop By Category
      Featured Items | Newest Items
      Top Ranking Items
      Give Feedback
      Footer ->
    */
    <>
      <Container maxWidth='xl'>
        <Carousel />
        <ShoppingCategory />
        <FeaturedNewest
          headers={
            language === 'en'
              ? ['Featured Products', 'Newest Products']
              : ['おすすめ商品', '新しい商品']
          }
        />
        <TopRanking
          title={language === 'en' ? 'Top Ranking Products' : '一番商品'}
          topRanking={topRanking}
        />
      </Container>
      <Feedback />
      <Footer />
    </>
  )
}

export default Home
