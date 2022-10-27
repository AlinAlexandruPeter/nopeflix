import React from 'react';
import "./css/App.css";

import Row from "./components/Row";
import Banner from "./components/Banner";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

import requests from "./js/requests";

function App() {

  return (
    <div className="app">

      <Nav />
      <Banner />
      <Row
        key={1}
        title="Netflix Originals"
        fetchURL={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row
        key={2}
        title="Trending Now"
        fetchURL={requests.fetchTrending}
      />
      <Row
        key={3}
        title="Top Rated"
        fetchURL={requests.fetchTopRated}
      />
      <Row
        key={4}
        title="Action Movies"
        fetchURL={requests.fetchActionMovies}
      />
      <Row
        key={5}
        title="Comedy Movies"
        fetchURL={requests.fetchComedyMovies}
      />
      <Row
        key={6}
        title="Horror Movies"
        fetchURL={requests.fetchHorrorMovies}
      />
      <Row
        key={7}
        title="Romance Movies"
        fetchURL={requests.fetchRomanceMovies}
      />
      <Row
        key={8}
        title="Documentaries"
        fetchURL={requests.fetchDocumentaries}
      />
      <Row
        key={9}
        title="Science Fiction"
        fetchURL={requests.fetchSciFi}
      />
      <Row
        key={10}
        title="Adventure"
        fetchURL={requests.fetchAdventure}
      />
      <Row
        key={11}
        title="War"
        fetchURL={requests.fetchWar}
      />
      <Row
        key={12}
        title="Music"
        fetchURL={requests.fetchMusic}
      />
      <Row
        key={13}
        title="Animation"
        fetchURL={requests.fetchAnimation}
      />
      <Row
        key={14}
        title="Drama"
        fetchURL={requests.fetchDrama}
      />
      <Row
        key={15}
        title="Family"
        fetchURL={requests.fetchFamily}
      />
      <Row
        key={16}
        title="Fantasy"
        fetchURL={requests.fetchFantasy}
      />
      <Row
        key={17}
        title="History"
        fetchURL={requests.fetchHistory}
      />
      <Row
        key={18}
        title="Thriller"
        fetchURL={requests.fetchThriller}
      />
      <Footer />
    </div>
  );
}

export default App;
