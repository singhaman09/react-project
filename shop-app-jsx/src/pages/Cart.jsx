// src/pages/Cart.jsx
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQty } from "../redux/cartSlice";

const Cart = () => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleQtyChange = (id, qty) => {
    if (qty < 1) return;
    dispatch(updateQty({ id, qty }));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cart.map(item => (
          <div key={item.id} className="flex items-center justify-between mb-4 border-b pb-2">
            <div className="flex items-center gap-4">
              <img src={item.image} alt="" className="h-16 object-contain" />
              <div>
                <h3 className="font-semibold text-sm">{item.title}</h3>
                <p className="text-green-600">${item.price}</p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <button onClick={() => handleQtyChange(item.id, item.qty - 1)} className="px-2 bg-gray-300">-</button>
              <span>{item.qty}</span>
              <button onClick={() => handleQtyChange(item.id, item.qty + 1)} className="px-2 bg-gray-300">+</button>
              <button onClick={() => dispatch(removeFromCart(item.id))} className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
