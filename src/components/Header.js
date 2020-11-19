import React from "react";
import { Link } from "react-router-dom";
import marveLogo from "../img/marvelLogo.png";

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <img src={marveLogo} alt="logo marvel" className="marveLogo" />
      </Link>
    </header>
  );
};

export default Header;
