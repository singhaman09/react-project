import React from 'react';
import { Link } from 'react-router-dom';

const products=[
  
  {id:1,name:'p1',description:'this is car'},
  {id:2,name:'p2',description:'this is bike'},
  {id:3,name:'p3',description:'this is cycle'}

];

const ProductList=()=>{
  return(
    <>
    <h1>Product List</h1>
    <ul>
      {products.map((product)=>(
          <li key={products.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <Link to={`/product/${product.id}`}> <button>View Details</button> </Link>
          </li>
      ))}
     </ul>
    </>
  )}

export default ProductList;

