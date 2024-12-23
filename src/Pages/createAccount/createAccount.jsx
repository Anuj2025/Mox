import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../Login/Login"
import SignUp from "../SignUp/Signup"

export default function CreateAccount() {
  const [Mode, setMode] = useState("Login");
  const navigate = useNavigate();

  const addModeToParams = () => {
    if (Mode === "Login") {
      navigate(`?mode=${Mode.toLowerCase()}`, { replace: true });
    } else if (Mode === "SignUp") {
      navigate(`?mode=${Mode.toLowerCase()}`, { replace: true });
    }
  };

  useEffect(() => {
    addModeToParams();
  }, [Mode]);

  return (
    <div>
      {/* Conditionally render components */}
      {Mode === "Login" && <main><Login />
      <div className="NagivatorBtns">
  <h3>Try This</h3>
      {Mode === "Login" &&  <button onClick={() => setMode("SignUp")}>Switch to Sign Up</button>}

{Mode === "SignUp" && <button onClick={() => setMode("Login")}>Switch to Login</button>}

</div>

      </main>}
      {Mode === "SignUp" && <main><SignUp />
      <div className="NagivatorBtns">
  <h3>Try This</h3>
      {Mode === "Login" &&  <button onClick={() => setMode("SignUp")}>Switch to Sign Up</button>}

{Mode === "SignUp" && <button onClick={() => setMode("Login")}>Switch to Login</button>}

</div>
      </main>}

     {/* Buttons to toggle mode */}

    </div>
  );
}
