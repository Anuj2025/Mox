import { useEffect, useState } from 'react';
import Loader from './Loader/Loader';
import gsap from 'gsap';

import * as TiIcons from "react-icons/ti"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(true);
  
  useEffect(() => {
    const loadContent = async () => {
      // Example of async data fetching
      // await fetchData(); 
      
      setTimeout(() => {
        setLoader(false); 
      }, 2000); 
    };

    loadContent();
  }, []);
  
  useEffect(() => {
    gsap.fromTo(
      ".pop",      
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    );
  }, []);

  const HandleNavbar = () => {
    setIsOpen(!isOpen); // Correctly toggling the state
  };

  return (
    <>
      <header>
        <div className="logo">mox</div>
        <div className="openTool" onClick={HandleNavbar}>
          <TiIcons.TiThMenu size={24} />
        </div>
      </header>

      <div className={isOpen ? "navbar ActiveBar" : "navbar hidden"}>
        
              {loader ? (
        <Loader />
      ) : (
  <ul>
     <div className="Links-con1">
            <label className="lables" htmlFor="headers">Label</label>
            <li className="items1">Home</li>
            <li className="items2">About</li>
            <li className="items3">Links</li>
          </div>
        </ul>
      )}
      </div>
    </>
  );
}
