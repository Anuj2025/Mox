import * as FcIcons from "react-icons/fc";

import * as FaIcons from "react-icons/fa";

import "./Signup.css";

import BtnLoader from '../../Components/BtnLoaders/Btnloaders';

import { useState } from "react";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { ToastContainer, toast, Bounce } from 'react-toastify';

import app from "../../_Auth/Firebase";

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);

  const auth = getAuth(app);
  const db = getFirestore(app); // Correct Firestore initialization

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle Sign Up form submission
  async function handleLoader() {
    setIsLoading(true);

    try {
      // Create a new user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data to Firestore
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          userName: email.split("@")[0],
          createdDate: new Date(),
        });
        
        toast.success('User Created Successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: Bounce,
        });

        // Navigate to products page
        window.location.pathname = `/products?Id=${user.uid}`;
      }
    } catch (error) {
      // Handle errors
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="LoginCon">
        <div className="flexBox">
          <h2 className="Header">Sign Up</h2>
          <input
            type="text"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="error">
            <p id="error-element"></p>
          </div>

          <div className="AuthOpen">
            <button id="Google" onClick={() => setIsGoogleLoading(true)}>
              <FcIcons.FcGoogle size={24} />{" "}
              {isGoogleLoading ? <BtnLoader /> : "Google"}
            </button>
            <button id="Github" onClick={() => setIsGithubLoading(true)}>
              <FaIcons.FaGithub size={24} />{" "}
              {isGithubLoading ? <BtnLoader /> : "Github"}
            </button>
          </div>

          <div className="loginBtns">
            <button id="btns-lgn" className="lgn" onClick={handleLoader}>
              {isLoading ? <BtnLoader /> : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
