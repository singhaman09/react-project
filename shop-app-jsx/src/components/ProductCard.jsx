// src/components/ProductCard.jsx
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="border rounded p-4 shadow hover:shadow-md transition">
      <img src={product.image} alt={product.title} className="h-40 mx-auto object-contain mb-4" />
      <h3 className="text-sm font-semibold">{product.title}</h3>
      <p className="text-green-600 font-bold">${product.price}</p>
      <button
        onClick={() => dispatch(addToCart(product))}
        className="mt-2 bg-blue-600 text-white w-full py-1 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
