import React from "react";
import "./App.css";
import Row from "./components/row/Row";
import requests from "./requests";
import Banner from "./components/banner/Banner";

const App = () => {
  return (
    <div className="app">
      <h1 className="app__header">Hit originals, movies and TV</h1>
      <div className="app__container">
        <Banner />
        <Row title="Popular TV" fetchUrl={requests.fetchPopularTv} />
        <Row title="Drama TV" fetchUrl={requests.fetchTopRated} />
        <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
        <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
        <Row title="Horror Movies" fetchUrl={requests.fetchHororMovies} />
        <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
      </div>
    </div>
  );
};

export default App;
