import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
// // extra imports
// import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'

const CheckoutPage = () => {
  return <main>
    <PageHero page='checkout' />
    <Wrapper className='page' >
      <h2>Checkout here</h2>
    </Wrapper>
  </main>
}
const Wrapper = styled.div``
export default CheckoutPage;
