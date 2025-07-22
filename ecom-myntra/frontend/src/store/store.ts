import {configureStore} from '@reduxjs/toolkit';
import ProductReducer from '../features/product/productSlice'
import ordersReducer from '../features/order/slice/orderSlice';
import wishlistReducer from '../features/wishlist/slice/wishlistSlice';
import authReducer from '../features/auth/authSlice'; 
import userReducer from '../features/profile/redux/slices/userSlice'
import addressReducer from '../features/profile/redux/slices/addressSlice'
import changePasswordReducer from '../features/profile/redux/slices/changePasswordSlice'
import cartReducer from '../features/cart/redux/cartSlice'
import notificationReducer from '../features/profile/redux/slices/notificationSlice';
const store = configureStore({
  reducer: {
    orders: ordersReducer,
    wishlist: wishlistReducer,
    product:ProductReducer,
    auth: authReducer,
    user:userReducer,
    address:addressReducer,
    changePassword:changePasswordReducer,
    cart : cartReducer,
    notifications: notificationReducer
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store
