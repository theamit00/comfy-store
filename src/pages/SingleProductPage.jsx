import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SingleProductPage = () => {

  const {fetchSingleProduct, isFetchingSingleProduct:loading, isFetchingSingleProductError:error, singleProduct } = useProductsContext();
  const {id} = useParams();

  useEffect(()=>{
    fetchSingleProduct(`${url}${id}`);
  },[])

  if(loading){
    return <Loading/>
  }

  if(error){
    return <Error />
  }

  return (
    <Wrapper>
      <PageHero page='products' subPage={singleProduct.name} />
      <div className="section section-center page">
        <Link to={'/products'} className='btn' >
          back to products
        </Link>
        <div className="product-center">
          <ProductImages images={singleProduct.images} />
          <div className="content">
            <h2>{singleProduct.name}</h2>
            <Stars reviews={singleProduct.reviews} stars={singleProduct.stars} />
            <h5 className='price' >{formatPrice(singleProduct.price)}</h5>
            <p className="desc">{singleProduct.description}</p>
            <p className="info"><span>Available: </span>{singleProduct.stock > 0 ? 'in stock' : 'out of stock'}</p>
            <p className="info"><span>SKU:</span>{singleProduct.id}</p>
            <p className="info"><span>Brand</span>{singleProduct.company}</p>
            <hr/>
            <AddToCart product={singleProduct} />
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage
