import React, { useState, useEffect } from 'react';
import axios from "../js/axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

import "../css/row.scss";

const baseURL = "https://image.tmdb.org/t/p/original";

export default function Row(props) {
    const { title, fetchURL, isLargeRow } = props;
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState([])
    const [genres, setGenres] = useState([])
    const [trailerURL, setTrailerURL] = useState("");

    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const url = "https://api.themoviedb.org/3"

    useEffect(() => {
        async function fetchMovies() {
            const request  = await axios.get(`${url}${fetchURL}`, {
                params: {
                    api_key: API_KEY,
                    append_to_response: "videos"
                }
            })
            setMovies(request.data.results);
            return request;
        };
        
        fetchMovies();
    }, [fetchURL]);

    // initiating the trailer width to be half the width
    // of the screen and then reducing it to 80%, the values
    // of the trailer width and height are initiated for the desktop version
    // but with the if statement it is changing for mobile devices
    let trailerWidth = (window.innerWidth / 2) * 0.9, trailerHeight = 400;
    if(window.innerWidth < 501) {
      trailerWidth *= 2 ;
      trailerHeight = trailerWidth / 16 * 9;
    } else {
      trailerWidth += trailerWidth * 0.1;
    }
    const options = {
        height: `${trailerHeight}`,
        width: `${trailerWidth}`,
        playerVars: {
            autoplay: 1
        },
    }

    const fetchMovie = async (id) => {
        const { data } = await axios.get(`${url}/movie/${id}`, {
            params: {
                api_key: API_KEY,
                append_to_response: "videos"
            }
        });
        setSelectedMovie(data)
        const movieGenres = data.genres.map(genre => {
            return (
                <span
                    key={data.genres.indexOf(genre)}
                    className="genres"
                >
                    {genre.name}
                </span>
            )
        })
        setGenres(movieGenres)

        if (data.videos && data.videos.results) {
            const trailer = data.videos.results.find(vid => vid.name === "Official Trailer")
            setTrailerURL(trailer ? trailer.key : data.videos.results[0].key)
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
                                
                                fetchMovie(movie.id);
                            }}
                            className={`row-poster ${isLargeRow && "row-poster-large"}`}
                            src={isLargeRow ? baseURL + movie.poster_path : baseURL + movie.backdrop_path}
                            alt={movie.name}
                        />
                    })
                }
            </div>

            <div className="trailer-wrapper">
                {trailerURL && <YouTube videoId={trailerURL} opts={options} />}
                <div className="movie-details">
                    {
                        trailerURL &&
                        <h1>
                            <a
                                href={`https://www.imdb.com/title/${selectedMovie.imdb_id}`}
                                target="_blank"
                            >
                                {selectedMovie.title}
                            </a>
                        </h1>
                    }
                    <br />
                    {
                        trailerURL &&
                        <div className="runtime-votes">
                            {selectedMovie && <span>{selectedMovie.runtime}min </span>}
                            {
                                selectedMovie &&
                                <span>
                                    {
                                        selectedMovie.vote_average.toString().split(".")[1].length > 2 ?
                                        selectedMovie.vote_average.toString().substring(0, selectedMovie.vote_average.toString().length - 1) :
                                        selectedMovie.vote_average
                                    } / 10
                                </span>
                            }
                            {selectedMovie && <span>votes: {selectedMovie.vote_count}</span>}
                        </div>
                    }
                    <br />
                    {trailerURL && <p>{selectedMovie.overview}</p>}
                    <br />
                    {trailerURL && <h3>Genres: {genres}</h3>}
                    <br />
                    {trailerURL && <h3>Accesed: <span>{Math.floor(selectedMovie.popularity)} times (on TMDb)</span></h3>}
                    <br />
                    {trailerURL && <h3>Release Date: <span>{selectedMovie.release_date}</span></h3>}
                </div>
            </div>
        </div>
    )
};
