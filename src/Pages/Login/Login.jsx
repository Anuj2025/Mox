import { useState } from 'react';
import './Login.css';
import BtnLoader from '../../Components/BtnLoaders/Btnloaders';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../_Auth/Firebase";
import { toast } from 'react-toastify';


export default function Login() {
  const [isLoading, setIsLoading] = useState(false); // State to manage loading
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); // Correct state name
  const auth = getAuth(app);

  async function handleLoader() {
    setIsLoading(true);
    
    
    // Sign in with email and password
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in successfully
        const user = userCredential.user;
     
        toast.success('User logged in successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: "bounce",
        });
        window.location.pathname = "/products";
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: "bounce",
        });
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false); // Hide loader after async operation is complete
        }, 2000); // Adjust delay as necessary
      });
  }

  return (
    <>
      <div className="LoginCon">
        <div className="flexBox">
          <h2 className="Header">Login</h2>
          <input 
            type="email"
            className="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email" 
          />
          <input 
            type="password" 
            className="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" 
          />
          
          <div className="loginBtns">
            <button id="btns-lgn" className="lgn" onClick={handleLoader}>
              {isLoading ? <BtnLoader /> : "Log In"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
