import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const {filteredProducts:products, grid_view}= useFilterContext();

  if(products.length < 1){
    return (
      <h5 style={{transform:'none'}} >
        Sorry, no products matched your search...
      </h5>
    )
  }

  if(grid_view === false){
    return <ListView products={products} />
  }

  return <GridView products={products} /> 
}

export default ProductList
