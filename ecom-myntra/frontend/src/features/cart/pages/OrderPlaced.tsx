import styles from "../components/styles/OrderPlaced.module.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { resetCart } from "../redux/cartSlice";

const OrderPlaced = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handlePlaceOrder = () => {
    // send details to order page

    dispatch(resetCart()); // reset the cart from cartId

    navigate("/");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <img
          src="https://lottie.host/6ba4bff2-cbf7-41e4-b34f-c11dcae8965d/RCfHYmdGke.json"
          alt="Order Success"
          className={styles.lottie}
        />

        <h2 className={styles.title}>Order Placed Successfully! 🎉</h2>
        <p className={styles.subtitle}>
          Thank you for shopping with us, Siddharth! Your items will be
          delivered soon 🚚
        </p>

        <button onClick={handlePlaceOrder} className={styles.homeBtn}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderPlaced;
