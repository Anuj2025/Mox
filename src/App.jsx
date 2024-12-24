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
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import Products from "./Pages/Products/Product";
import { ToastContainer } from 'react-toastify';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./_Auth/Firebase";

export default function App() {
  const [loader, setLoader] = useState(true);

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Handle Firebase Authentication State
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoader(false); // Set loader to false once the auth state is determined
    });
    return () => unsubscribe(); // Cleanup subscription
  }, []);

  // Load Content and Initialize GSAP Animations
  useEffect(() => {
    const loadContent = async () => {
      // Example of async data fetching
      // await fetchData(); 
      setLoader(false); // Set loader to false after loading content
    };

    loadContent();

    // Initialize GSAP animation
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
            closeOnClick
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
            <Route path="/products" element={<Products />} />
          </Routes>
        </main>
      )}
      <Footer />
    </>
  );
}
