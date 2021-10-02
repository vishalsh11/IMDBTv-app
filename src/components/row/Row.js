import React, { useState, useEffect } from "react";
import axios from "../../axios";
import Modal from "../popup/Modal";

import "./Row.css";

const baseURL = "https://image.tmdb.org/t/p/original";

const Row = ({ title, fetchUrl, isLargeRow = false, onMovie }) => {
  const [movies, setmovies] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const openModalHandler = () => setShowModal(true);
  const closeModalHandler = () => setShowModal(false);

  useEffect(() => {
    const getMovies = async () => {
      const res = await axios.get(fetchUrl);
      setmovies(res.data.results);
    };
    getMovies();
  }, [fetchUrl]);

  return (
    <React.Fragment>
      {showModal && (
        <Modal show={showModal} onCancel={closeModalHandler} element="Movie" />
      )}
      <div className="row">
        <div className="row__title">
          <h3>{title}</h3>
        </div>
        <div className="row__posters">
          {movies.map((movie) => (
            <img
              onClick={openModalHandler}
              key={movie.id}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`${baseURL}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.original_name}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Row;
