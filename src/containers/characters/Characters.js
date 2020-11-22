import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-grid-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

  //state pour recevoir ce que recherche l'utilisateur
  const [searchValue, setSearchValue] = useState("");

  //states pour pagination
  const [maxPages, setMaxPages] = useState();
  const [page, setPage] = useState(1);

  //tableau avec les numéros de page
  const numPages = [];
  for (let i = 1; i <= maxPages; i++) {
    numPages.push(i);
  }

  //states pour les favoris
  const [characterFavorites, setCharacterFavorites] = useState([]);

  //state pour menu déroulant, nombre de résultats par page
  // const [showResultsMenu, setshowResultsMenu] = useState(false);

  useEffect(() => {
    const fetchData = async (page) => {
      try {
        const response = await axios.get(
          `https://marvel-lereacteur-backend.herokuapp.com/characters?page=${page}`
        );
        const pages = Math.ceil(response.data.total / 100);
        setMaxPages(pages);
        setData(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData(page);
  }, [page]);

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

  //fonction pour gérer la recherche
  const handleChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  //fonction de gestion de la recherche
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `https://marvel-lereacteur-backend.herokuapp.com/characters?searchValue=${searchValue}&page=${page}`
      );
      const pages = Math.ceil(response.data.total / 100);
      setMaxPages(pages);
      setData(response.data.results);
      setIsLoading(false);
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
        <ul className="paginationCharacters">
          {numPages.map((page, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  setPage(page);
                }}
              >
                {page}
              </li>
            );
          })}
        </ul>
        <div className="charactersCol1">
          <form
            className="characterSearchForm"
            onSubmit={(event) => {
              handleSubmit(event);
            }}
          >
            <input
              type="text"
              placeholder="Character search"
              onChange={handleChange}
            />
            <button type="submit">Search</button>
          </form>

          <Carousel cols={3} rows={4} gap={10} showDots={true}>
            {data.map((item, index) => {
              const imageSource =
                item.thumbnail.path +
                "/standard_medium." +
                item.thumbnail.extension;
              return (
                <Carousel.Item key={index}>
                  <div className="charactersWrapper" key={index}>
                    <img
                      src={imageSource}
                      alt="characterImage"
                      className="characterImage"
                      onClick={() => {
                        handleClick(item.id);
                      }}
                    />
                    <div className="characterInfo">
                      <p>{item.name}</p>
                      <p>{item.description}</p>
                      <div
                        onClick={() => {
                          const newFav = [...characterFavorites];
                          newFav.push({
                            urlImage: imageSource,
                            name: item.name,
                          });
                          setCharacterFavorites(newFav);
                        }}
                      >
                        <FontAwesomeIcon icon="heart" />
                      </div>
                    </div>
                  </div>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
        {!ShowCharacterModal ? null : (
          <div>
            <div
              className="exitCharacter"
              onClick={() => {
                setShowCharacterModal(false);
              }}
            >
              X
            </div>
            <div className="characterComicInfo">
              {comicsData.map((charComic, index2) => {
                const comicImageSource =
                  charComic.thumbnail.path +
                  "/standard_medium." +
                  charComic.thumbnail.extension;
                return (
                  <div key={index2} className="characterComicInfoBox">
                    <img
                      src={comicImageSource}
                      alt="characterComicImage"
                      className="characterComicImage"
                    />
                    <div>
                      <p>{charComic.title}</p>
                      <p>{charComic.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div
          className={!ShowCharacterModal ? null : "characterModalBackground"}
        ></div>
        <ul className="charactersCol3">
          <p>FAVORITES</p>
          {characterFavorites.map((favCharacter, index) => {
            return (
              <li key={index} className="favCharactersBox">
                <div
                  onClick={() => {
                    const newFav = [...characterFavorites];
                    newFav.splice(index, 1);
                    setCharacterFavorites(newFav);
                  }}
                >
                  X
                </div>
                <img
                  src={favCharacter.urlImage}
                  alt="Favorite character"
                  className="favCharacterImage"
                />
                <p>{favCharacter.name}</p>
              </li>
            );
          })}
        </ul>
      </main>

      <Footer />
    </div>
  );
};

export default Characters;
