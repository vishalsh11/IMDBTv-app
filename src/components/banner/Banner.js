import React, { useState, useEffect } from "react";

import requests from "../../requests";
import axios from "../../axios";
import Modal from "../popup/Modal";

import "./Banner.css";

// import ImdbTvLogo from "IMDbTV-Logo-white.svg";
import { ReactComponent as ImdbTvLogo } from "./IMDbTV-Logo-white.svg";
const Banner = () => {
  const [movie, setmovie] = useState([]);

  const [metaData, setMetaData] = useState({
    run_time: null,
    air_date: null,
    genre: null,
    rating: null,
    cast: null,
  });

  const [showModal, setShowModal] = useState(false);

  const openModalHandler = () => setShowModal(true);
  const closeModalHandler = () => setShowModal(false);

  useEffect(() => {
    const getRandomMovie = async () => {
      const res = await axios.get(requests.fetchPopularTv);
      let randomMovie =
        res.data.results[
          Math.floor(Math.random() * res.data.results.length - 1)
        ];
      if (randomMovie) {
        let detailsUrl = requests.fetchDetails.replace(
          "{tv_id}",
          randomMovie.id
        );
        const {
          data: { episode_run_time, first_air_date, genres, vote_average },
        } = await axios.get(detailsUrl);

        let metaData = {
          run_time: null,
          air_date: null,
          genre: null,
          rating: null,
          cast: null,
        };
        if (episode_run_time.length) {
          metaData.run_time = episode_run_time[0];
        }
        if (first_air_date) {
          metaData.air_date = first_air_date.split("-")[0];
        }
        if (genres) {
          metaData.genre = genres[0].name;
        }
        if (vote_average) {
          metaData.rating = vote_average;
        }
        let creditsUrl = requests.fetchCredits.replace(
          "{tv_id}",
          randomMovie.id
        );
        const credits = await axios.get(creditsUrl);
        if (credits.data.cast) {
          metaData.cast = credits.data.cast
            .map((c) => c.name)
            .slice(0, 3)
            .join(", ");
        }
        setMetaData(metaData);
      }
      setmovie(randomMovie);
      return res;
    };
    getRandomMovie();
  }, []);

  const truncate = (str, n) =>
    str?.length > n ? `${str.substr(0, n - 1)}...` : str;

  return (
    <React.Fragment>
      {showModal && (
        <Modal
          show={showModal}
          onCancel={closeModalHandler}
          element="Settings"
        />
      )}
      <header className="banner">
        <div className="banner__contents">
          <div className="banner__buttons">
            <button className="banner__button banner__button--signin">
              Sign In
            </button>
            <button className="banner__button" onClick={openModalHandler}>
              <img src="/outline_settings_white_24dp.png" alt="settings" />
            </button>
            <ImdbTvLogo className="banner__imdbTvlogo" />
          </div>
          <h1 className="banner__title">
            {movie?.title || movie.name || movie.original_name}
          </h1>
          <div className="banner__meta">
            <div className="banner__rating">
              <img
                className="banner__imdblogo"
                height={18}
                src="/imdb-logo.png"
                alt="imdb-logo"
              />
              <div>{metaData.rating}</div>
            </div>
            <div>{metaData.genre}</div>
            <div>{metaData.air_date}</div>
            <div>{metaData.run_time}m</div>
            <div>{metaData.cast}</div>
          </div>
          <p className="banner__description">{truncate(movie.overview, 150)}</p>
        </div>

        {/* <div className="banner--fadeBottom"></div> */}
      </header>
    </React.Fragment>
  );
};

export default Banner;
