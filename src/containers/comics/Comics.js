import React, { useState, useEffect } from "react";
import "../comics/comics.css";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import marvelIntro from "../../img/marvelIntro.jpeg";

const Comics = () => {
  //state récéptrice des données de la requête
  const [data, setData] = useState();

  //state pour attendre la fin de la requête
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://marvel-lereacteur-backend.herokuapp.com/comics"
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <div>
      <img src={marvelIntro} alt="marvel intro" className="imageLoading" />
    </div>
  ) : (
    <div>
      <Header />
      {data.map((item, index) => {
        const imageSource =
          item.thumbnail.path + "/standard_large." + item.thumbnail.extension;
        return (
          <div className="comicsWrapper" key={index}>
            <img src={imageSource} alt="comicsImage" />
            <div>{item.title}</div>
            <div>{item.description}</div>
          </div>
        );
      })}
      <Footer />
    </div>
  );
};

export default Comics;
