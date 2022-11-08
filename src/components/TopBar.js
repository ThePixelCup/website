import React, { useEffect, useState } from "react";

// Assets
import logoMini from "../assets/images/logo-mini.png";

const TopBar = () => {
  const [topBarFixed, fixTopBar] = useState(false);
  useEffect(() => {
    const handleScroll = event => {
      if (window && window.scrollY > 70) fixTopBar(true);
      if (window && window.scrollY < 70) fixTopBar(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`fixed z-40 text-right w-full ${topBarFixed ? 'bg-neutral-900 shadow-md shadow-neutral-600' : ''}`}>
      <div className="container mx-auto max-w-6xl p-4 flex flex-row">
        <div className={`inline ${topBarFixed ? 'md:inline': 'md:hidden'}`}>
          <img className="mx-auto h-12" src={logoMini} alt="The Pixel Cup" />
        </div>
        <div className="grow text-right">
          {/* <span className="hidden md:inline">Already have a pack?</span> <button className="ml-4 cursor-pointer hover:bg-lime-400 border-lime-400 border text-lime-400 hover:text-neutral-900 rounded-md md:w-36 p-2.5">Connect Wallet</button> */}
        </div>
      </div>
    </div>
  );
};

export default TopBar;