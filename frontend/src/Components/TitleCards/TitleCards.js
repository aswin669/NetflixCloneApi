import React, { useRef, useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { API_KEY, imageUrl } from '../../constants/constants';
import axios from '../../axios';
import './TitleCards.css';

const categoryUrls = {
  trending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  action: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  originals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  comedy: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  horror: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  romance: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  documentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

function TitleCards({ category }) {
  const postersRef = useRef(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(categoryUrls[category]);
        setMovies(response.data.results);
      } catch (error) {
        if (error.response) {
          console.error('Error response:', error.response);
        } else if (error.request) {
          console.error('Network error:', error.request);
        } else {
          console.error('Error:', error.message);
        }
      }
    }
    fetchData();
  }, [category]);

  useEffect(() => {
    const handleScroll = (event) => {
      if (postersRef.current) {
        postersRef.current.scrollLeft += event.deltaY * 0.5; 
      }
    };

    const postersElement = postersRef.current;
    postersElement.addEventListener('wheel', handleScroll);

    return () => {
      postersElement.removeEventListener('wheel', handleScroll);
    };
  }, []);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const fetchTrailer = async (movieId) => {
    try {
      const response = await axios.get(`/movie/${movieId}/videos?api_key=${API_KEY}`);
      if (response.data.results.length > 0) {
        setSelectedMovie(response.data.results[0].key);
      } else {
        console.log('Trailer not found');
      }
    } catch (error) {
      console.error("Failed to fetch trailer", error);
    }
  };

  const handlePosterClick = (movie) => {
    fetchTrailer(movie.id);
  };

  const handleCloseClick = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="row">
      <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Movies</h2>
      <div className="posters" ref={postersRef}>
        {movies.map((movie) => (
          <div key={movie.id} className="poster-container" onClick={() => handlePosterClick(movie)}>
            <img
              className="poster"
              alt={movie.title || movie.name}
              src={`${imageUrl}${movie.poster_path}`}
            />
            <div className="poster-title">{movie.title || movie.name}</div>
          </div>
        ))}
      </div>
      {selectedMovie && (
        <div className="youtube-container">
          <button className="close-button" onClick={handleCloseClick}>X</button>
          <YouTube videoId={selectedMovie} opts={opts} />
        </div>
      )}
    </div>
  );
}

export default TitleCards;
