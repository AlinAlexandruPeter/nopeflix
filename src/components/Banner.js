import React, { useState, useEffect } from 'react';
import axios from "../js/axios";
import requests from "../js/requests";

import "../css/banner.scss"

const baseURL = "https://image.tmdb.org/t/p/original";

export default function Banner(props) {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchTrending);
            const random = Math.floor(Math.random() * request.data.results.length - 1);
            setMovie(request.data.results[random]);
        };
        fetchData();
    }, []);

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <header
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(
                    ${baseURL}${movie.backdrop_path}
                )`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "500px",
                width: "100%"
            }}
        >
            <div className="banner-content">
                <h1>
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner-buttons">
                    <button className="banner-button">Play</button>
                    <button className="banner-button">My List</button>
                </div>
                <div className="banner-description">
                    {truncate(movie?.overview, 400)}
                </div>
            </div>

            <div className="banner-fade-bottom" />
        </header>
    )
}
