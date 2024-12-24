import React, { useEffect, useRef, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import "./Home.css";
import { Link } from "react-router-dom";
import TypingEffect from "../../Anime/Anime";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import Loader from "../../Components/Loader/Loader";
import app from "../../_Auth/Firebase";

export default function Home() {
  const bannerRef = useRef(null);
  const auth = getAuth(app);

  const [elementLoggedIn, setElementLoggedIn] = useState("");
  const [loader, setLoader] = useState(false);
  const [loggedUser, setLoggedUser] = useState("");

  // Typing effect for the banner
  useEffect(() => {
    if (bannerRef.current) {
      TypingEffect(bannerRef.current);
    }
  }, []);

  // Authentication listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedUser(user ? `hello, ${user.email.split("@")[0]}` : "Hello, user!");

      if (user) {
        
        setElementLoggedIn(
          <div className="createAccount">
            <h3>Get New Stickers Now!</h3>
            <div>
              <div className="Btns">
                <button className="CreateAccount">
                  <Link
                    to={{
                      pathname: "/products",
                      search: `?q=${user.uid}`,
                      hash: `#${user.email.split("@")[0]}`,
                    }}
                  >
                    Continue As {user.email}
                  </Link>
                </button>
                <div>or</div>
                <button onClick={handleLogOut}>
                  <Link to="/createAccount">Create New One!</Link>
                </button>
              </div>
            </div>
          </div>
        );
      } else {
        setElementLoggedIn(
          <div className="createAccount">
            <h3>Start By Creating Account</h3>
            <div>
              <div className="Btns">
                <button className="CreateAccount">
                  <Link
                    to={{
                      pathname: "/createAccount",
                      search: "?q=id",
                      hash: "#hash",
                    }}
                  >
                    Login Or Create Account
                  </Link>
                </button>
              </div>
            </div>
          </div>
        );
      }
      setLoader(false); // Hide loader once authentication state is resolved
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, [auth]);

  // Handle user sign out
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      toast.success('logOut Successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: Bounce,
        });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          {/* Banner */}
          <div className="Banner">
            <div className="BannerImg" ref={bannerRef}>
              {loggedUser || "Hello,  user!"}
            </div>
          </div>
          {/* Login Now Section */}
          <div className="loginNow">{elementLoggedIn}</div>
        </>
      )}
    </>
  );
}
