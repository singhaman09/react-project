import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const products=[
  {id:1,name:'p1',description:'this is car'},
  {id:2,name:'p2',description:'this is bike'},
  {id:3,name:'p3',description:'this is cycle'}
]

const ProductDetails=()=>{
  const {id}=useParams ();
  const [product,setProduct]=useState(null);

  useEffect(()=>{
    const product =products.find((p) => p.id===parseInt(id));
    setProduct(product);
  },[id]);

  if(!product) return <>LOading..........</>;

  return (
    <>
    <h1>{product.name}</h1>
    <p>{product.description}</p>
    </>
  )
}

export default ProductDetails;
