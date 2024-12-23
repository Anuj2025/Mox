import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import CreateAccount from './Pages/createAccount/createAccount';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import Loader from './Components/Loader/Loader';
import gsap from 'gsap';
import PageNotFound from "./Pages/PageNotFound/PageNotFound"
import Products from "./Pages/Products/Product"

import { ToastContainer, toast, Zoom, Bounce} from 'react-toastify';

export default function App() {

  const [loader, setLoader] = useState(true);
  
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  
  useEffect(() => {
    const loadContent = async () => {
      // Example of async data fetching
      // await fetchData(); 
      
      setTimeout(() => {
        setLoader(false); 
      }, 2000); 
    };

   loadContent();
   
    gsap.fromTo(
      ".Pop",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    );
  }, []);
  

  return (
    <>
      <Navbar />
      {loader ? (
        <Loader />
      ) : (
        <main className="Pop">
  <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
<Routes>
    <Route path="/" element={<Home />} />
    <Route path="/createAccount" element={<CreateAccount mode="login" />} />
    <Route path="/*" element={<PageNotFound />} />
<Route path="/product/:id" element={<Products />} />

          </Routes>
        </main>
      )}
      <Footer />
    </>
  );
}
