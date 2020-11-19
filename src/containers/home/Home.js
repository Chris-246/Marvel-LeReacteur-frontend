import React from "react";
import "../home/home.css";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import characters from "../../img/homeCharacters.png";
import comics from "../../img/homeComics.png";

const Home = () => {
  return (
    <div>
      <Header />
      <main className="homeMain">
        <Link to="/Characters" className="homeCol1">
          <img
            src={characters}
            alt="characters home"
            className="homeCharacters"
          />
          <div>Characters</div>
        </Link>
        <Link to="/Comics" className="homeCol2">
          <img src={comics} alt="comics home" className="homeComics" />
          <div>Comics</div>
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
