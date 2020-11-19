import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-grid-carousel";
import "../characters/characters.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import marvelIntro from "../../img/marvelIntro.jpeg";

const Characters = () => {
  //state récéptrice des données de la requête
  const [data, setData] = useState();

  //state pour attendre la fin de la requête
  const [isLoading, setIsLoading] = useState(true);

  //state pour activer la modale
  const [ShowCharacterModal, setShowCharacterModal] = useState(false);

  //state pour recevoir les infos des perso (les comics dans lesquels jouent les perso)
  const [comicsData, setcomicsData] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://marvel-lereacteur-backend.herokuapp.com/characters"
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

  //fonction pour gérer le clic pour la modale
  const handleClick = async (characterId) => {
    try {
      const response = await axios.get(
        `https://marvel-lereacteur-backend.herokuapp.com/characters/${characterId}`
      );
      setcomicsData(response.data);
      setShowCharacterModal(true);
    } catch (error) {
      console.log(error.response);
    }
  };

  return isLoading ? (
    <div>
      <img src={marvelIntro} alt="marvel intro" className="imageLoading" />
    </div>
  ) : (
    <div>
      <Header />
      <main className="charactersMain">
        {/* <div className="charactersCol1"> */}
        <Carousel cols={2} rows={4} gap={10} showDots={true}>
          {data.map((item, index) => {
            const imageSource =
              item.thumbnail.path +
              "/standard_medium." +
              item.thumbnail.extension;
            return (
              <Carousel.Item>
                <div
                  className="charactersWrapper"
                  key={index}
                  // onClick={handleClick(item.id)}
                >
                  <img
                    src={imageSource}
                    alt="characterImage"
                    className="characterImage"
                  />
                  <div className="characterInfo">
                    <p>{item.name}</p>
                    <p>{item.description}</p>
                  </div>
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
        {/* </div> */}
        {!ShowCharacterModal ? null : (
          <div>
            <div className="characterComicInfo">
              {comicsData.map((charComic, index2) => {
                const comicImageSource =
                  charComic.thumbnail.path +
                  "/standard_medium." +
                  charComic.thumbnail.extension;
                return (
                  <div key={index2}>
                    <img
                      src={comicImageSource}
                      alt="characterComicImage"
                      className="characterComicImage"
                    />
                    <p>{charComic.title}</p>
                    <p>{charComic.description}</p>
                  </div>
                );
              })}
            </div>
            <div className="characterModalBackground"></div>
          </div>
        )}

        <div className="charactersCol3"></div>
      </main>

      <Footer />
    </div>
  );
};

export default Characters;
