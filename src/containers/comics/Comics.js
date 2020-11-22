import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../comics/comics.css";
import axios from "axios";
import Carousel from "react-grid-carousel";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import marvelIntro from "../../img/marvelIntro.jpeg";

const Comics = () => {
  //state récéptrice des données de la requête
  const [data, setData] = useState();

  //state pour attendre la fin de la requête
  const [isLoading, setIsLoading] = useState(true);

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
  const [comicFavorites, setComicFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async (page) => {
      try {
        const response = await axios.get(
          `https://marvel-lereacteur-backend.herokuapp.com/comics?page=${page}`
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
        `https://marvel-lereacteur-backend.herokuapp.com/comics?searchValue=${searchValue}&page=${page}`
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
      <main className="comicsMain">
        <ul className="paginationComics">
          {page === 1 ? (
            <li
              onClick={() => {
                setPage(page + 1);
              }}
            >
              <FontAwesomeIcon icon="arrow-down" />
            </li>
          ) : page === maxPages ? (
            <li
              onClick={() => {
                setPage(page - 1);
              }}
            >
              <FontAwesomeIcon icon="arrow-up" />
            </li>
          ) : (
            <>
              <li
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                <FontAwesomeIcon icon="arrow-up" />
              </li>
              <li
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                <FontAwesomeIcon icon="arrow-down" />
              </li>
            </>
          )}
        </ul>
        <div className="comicsCol1">
          <form
            className="comicSearchForm"
            onSubmit={(event) => {
              handleSubmit(event);
            }}
          >
            <input
              type="text"
              placeholder="Comics search"
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
                  <div className="comicsWrapper" key={index}>
                    <img
                      src={imageSource}
                      alt="comicImage"
                      className="comicImage"
                    />
                    <div className="comicInfo">
                      <p>{item.title}</p>
                      <p>{item.description}</p>
                      <div
                        onClick={() => {
                          const newFav = [...comicFavorites];
                          newFav.push({
                            urlImage: imageSource,
                            title: item.title,
                          });
                          setComicFavorites(newFav);
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

        <ul className="comicsCol2">
          <p>FAVORITES</p>
          {comicFavorites.map((favComic, index) => {
            return (
              <li key={index} className="favComicsBox">
                <div
                  onClick={() => {
                    const newFav = [...comicFavorites];
                    newFav.splice(index, 1);
                    setComicFavorites(newFav);
                  }}
                >
                  X
                </div>
                <img
                  src={favComic.urlImage}
                  alt="Favorite comic"
                  className="favComicImage"
                />
                <p>{favComic.title}</p>
              </li>
            );
          })}
        </ul>
      </main>

      <Footer />
    </div>
  );
};

export default Comics;
