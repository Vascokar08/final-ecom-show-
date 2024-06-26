import React, { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './views/shop/home';
import MainWrapper from './layouts/MainWrapper';
import Login from './views/auth/login';
import PrivateRoute from './layouts/PrivateRoute';
import Logout from './views/auth/logout';
import Private from './views/auth/private';
import Register from './views/auth/register';
import StoreHeader from './views/base/StoreHeader';
import StoreFooter from './views/base/StoreFooter';
import ProductDetail from './views/shop/ProductDetail';
import Cart from './views/shop/Cart';
import Checkout from './views/shop/Checkout';
import PaymentSuccess from './views/shop/PaymentSuccess';
import Invoice from './views/shop/Invoice';
import Account from './views/customer/Account';
import Orders from './views/customer/Orders';
import OrderDetail from './views/customer/OrderDetail';
import Wishlist from './views/customer/Wishlist';
import Notifications from './views/customer/Notifications';
import Settings from './views/customer/Settings';
import { CartContext } from './views/plugin/Context';
import UserData from './views/plugin/UserData';
import CartID from './views/plugin/cartID';
import apiInstance from './utils/axios';
import Dashboard from './views/vendor/Dashboard';
import Products from './views/vendor/Products';
import AddProduct from './views/vendor/AddProduct';
import UpdateProduct from './views/vendor/UpdateProduct';
import VendorOrders from './views/vendor/Orders';
import VendorOrderDetail from './views/vendor/OrderDetail';
import Earning from './views/vendor/Earning';
import Reviews from './views/vendor/Reviews';
import ReviewDetail from './views/vendor/ReviewDetail';
import Coupon from './views/vendor/Coupon';
import EditCoupon from './views/vendor/EditCoupon';
import VendorNotifications from './views/vendor/Notifications';
import VendorSettings from './views/vendor/Settings';
import Shop from './views/vendor/Shop';
import Search from './views/shop/Search';
import ForgotPassword from './views/auth/forgotPassword';
import CreatePassword from './views/auth/createPassword';
import VendorRegister from './views/vendor/VendorRegister';
import OrderItemDetail from './views/vendor/OrderItemDetail';
import WhatsAppWidget from './views/whatsapp/WhatsAppWidget';
import FAQSection from './views/shop/faq';
import AboutSection from './views/shop/aboutus';
import ContactSection from './views/shop/contactus';



function App() {
  const [cartCount, setCartCount] = useState();
  const userData = UserData();
  let cart_id = CartID();
  const axios = apiInstance;

  useEffect(() => {
    const url = userData?.user_id ? `cart-list/${cart_id}/${userData?.user_id}/` : `cart-list/${cart_id}/`;
    axios.get(url).then((res) => {
      setCartCount(res.data.length);
    });

    // Add Botpress Chatbot Script
    const script1 = document.createElement('script');
    script1.src = 'https://cdn.botpress.cloud/webchat/v2/inject.js';
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://mediafiles.botpress.cloud/026e2366-0061-4651-920f-25a10cfb47a0/webchat/v2/config.js';
    script2.async = true;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, [axios, cart_id, userData?.user_id]);

  return (
    <CartContext.Provider value={[cartCount, setCartCount]}>
      <BrowserRouter>
        <StoreHeader />
        <MainWrapper>
          <Routes>
            
            <Route path="/private" element={<PrivateRoute><Private /></PrivateRoute>} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/create-new-password" element={<CreatePassword />} />
            <Route path="/detail/:slug" element={<ProductDetail />} />
            <Route path="/cart/" element={<Cart />} />
            <Route path="/checkout/:order_oid" element={<Checkout />} />
            <Route path="/payment-success/:order_oid/" element={<PaymentSuccess />} />
            <Route path="/invoice/:order_oid/" element={<Invoice />} />
            <Route path="/search" element={<Search />} />
            <Route path="/customer/account/" element={<PrivateRoute><Account /></PrivateRoute>} />
            <Route path="/customer/orders/" element={<PrivateRoute><Orders /></PrivateRoute>} />
            <Route path="/customer/order/detail/:order_oid/" element={<PrivateRoute><OrderDetail /></PrivateRoute>} />
            <Route path="/customer/wishlist/" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
            <Route path="/customer/notifications/" element={<PrivateRoute><Notifications /></PrivateRoute>} />
            <Route path="/customer/settings/" element={<PrivateRoute><Settings /></PrivateRoute>} />
            <Route path="/vendor/dashboard/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/vendor/products/" element={<PrivateRoute><Products /></PrivateRoute>} />
            <Route path="/vendor/product/new/" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
            <Route path="/vendor/product/update/:pid/" element={<PrivateRoute><UpdateProduct /></PrivateRoute>} />
            <Route path="/vendor/orders/" element={<PrivateRoute><VendorOrders /></PrivateRoute>} />
            <Route path="/vendor/orders/:oid/" element={<PrivateRoute><VendorOrderDetail /></PrivateRoute>} />
            <Route path="/vendor/earning/" element={<PrivateRoute><Earning /></PrivateRoute>} />
            <Route path="/vendor/reviews/" element={<PrivateRoute><Reviews /></PrivateRoute>} />
            <Route path="/vendor/reviews/:id/" element={<PrivateRoute><ReviewDetail /></PrivateRoute>} />
            <Route path="/vendor/coupon/" element={<PrivateRoute><Coupon /></PrivateRoute>} />
            <Route path="/vendor/coupon/:id/" element={<PrivateRoute><EditCoupon /></PrivateRoute>} />
            <Route path="/vendor/notifications/" element={<PrivateRoute><VendorNotifications /></PrivateRoute>} />
            <Route path="/vendor/settings/" element={<PrivateRoute><VendorSettings /></PrivateRoute>} />
            <Route path="/vendor/:slug/" element={<Shop />} />
            <Route path="/vendor/register/" element={<VendorRegister />} />
            <Route path="/vendor/orders/:oid/:id/" element={<OrderItemDetail />} />
          </Routes>
          

        <FAQSection/>
        <AboutSection/>
        <ContactSection/>
        </MainWrapper>
        <StoreFooter />
        <WhatsAppWidget />
      </BrowserRouter>
    </CartContext.Provider>
  );
}

export default App;
