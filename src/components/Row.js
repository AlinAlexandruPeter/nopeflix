import React, { useState, useEffect } from 'react';
import axios from "../js/axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

import "../css/row.scss";

const baseURL = "https://image.tmdb.org/t/p/original";

export default function Row(props) {
    const { title, fetchURL, isLargeRow } = props;
    const [movies, setMovies] = useState([]);
    const [trailerURL, setTrailerURL] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchURL);
            setMovies(request.data.results);
            return request;
        };

        fetchData();
    }, [fetchURL]);

    const options = {
        height: '400',
        width: '50%',
        playerVars: {
            autoplay: 1
        },
    }

    const handleMovieClick = (e, movie) => {
        if (trailerURL) {
            setTrailerURL("")
        } else {
            movieTrailer(movie?.name || "")
            .then(url => {
                const urlParams = new URLSearchParams(new URL(url).search);
                console.log(urlParams);
                const videoId = urlParams.get("v");
                setTrailerURL(videoId)
            })
            .catch(err => {
                console.error(err);
            })
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row-posters">
                {
                    movies.map(movie => {
                        return <img
                            key={movie.id}
                            onClick={e => {
                                handleMovieClick(e, movie);
                            }}
                            className={`row-poster ${isLargeRow && "row-poster-large"}`}
                            src={isLargeRow ? baseURL + movie.poster_path : baseURL + movie.backdrop_path}
                            alt={movie.name}
                        />
                    })
                }
            </div>

            {/* <div className="trailer-wrapper"></div> */}
            <div className="trailer-wrapper">
                {trailerURL && <YouTube videoId={trailerURL} opts={options} />}
            </div>
        </div>
    )
};