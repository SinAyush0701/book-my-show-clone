import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import MovieLayoutHoc from '../layout/Movie.layout';
import axios from "axios";
import { MovieContext } from '../context/Movie.context';
import Slider from 'react-slick';
import {FaCcVisa, FaCcApplePay} from "react-icons/fa"; // To get logos of visa & iphone
import PosterSlider from "../components/PosterSlider/PosterSlider.Component";
import MovieHero from '../components/MovieHero/MovieHero.Component';
import Cast from '../components/Cast/Cast.Component';

const MoviePage = () => {
  const {id}= useParams();
  const {movie, setMovie} = useContext(MovieContext);
  const [cast, setCast]= useState([]);
  const [similarMovies, setSimilarMovies]= useState([]);
  const [recommendedMovies, setRecommendedMovies]= useState([]);

  // calling the API again in movie page
  useEffect(() => {
    const requestCast = async () => {
      const getCast = await axios.get(`/movie/${id}/credits`);
      setCast(getCast.data.cast);
    };
    requestCast();
  }, [id]); // id added to fetch movie info w.r.t id

  // To trigger similar kind of movies (for promotions)
  useEffect(() => {
    const requestSimilarMovies = async () => {
      const getSimilarMovies = await axios.get(`/movie/${id}/similar`);
      setSimilarMovies(getSimilarMovies.data.results);
    };
    requestSimilarMovies();
  }, [id]);

  // To trigger recommended movies
  useEffect(() => {
    const requestRecommendedMovies = async () => {
      const getRecommendedMovies = await axios.get(`/movie/${id}/recommendations`);
      setRecommendedMovies(getRecommendedMovies.data.results);
    };
    requestRecommendedMovies();
  }, [id]);

  useEffect(() => {
    const requestMovie = async () => {
      const getMovieData = await axios.get(`/movie/${id}`);
      setMovie(getMovieData.data);
    };
    requestMovie();
  }, [id]); 

  const settingCast= {
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const settings= {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 4,
        },
      },
    ],
  };

  return ( 
  <>
  <MovieHero /> 
  <div className='my-12 container px-4 lg:ml-20 lg:w-2/3'>
    <div className='flex flex-col items-start gap-3'>
      <h1 className='text-gray-800 font-bold text-2xl'>About the movie</h1>
      <p>{movie.overview}</p> 
    </div>
    <div className='my-8'>
      <hr />
    </div>

    <div className='my-8'>
      {/* For offer section to buy or rent the movie */}
      <h2 className='text-gray-800 font-bold text-2xl mb-3'>Applicable Offers</h2>
      <div className='flex flex-col gap-3 lg:flex-row'>
        {/* For Visa Icon */}
        <div className='flex items-start gap-2 bg-yellow-100 p-3 border-yellow-400 border-dashed border-2 rounded-md'>
          <div className='w-8 h-8'>
            <FaCcVisa className='w-full h-full' />
          </div>
          <div className='flex flex-col items-start'>
            <h3 className='text-gray-700 text-xl font-bold'>
              Visa Stream Offer
            </h3>
            <p className='text-gray-600'> Get 50% off upto INR 150 on all RuPay card on BookMyShow Stream</p> {/* For promotional purpose */}
          </div>
        </div>
        <div className='flex items-start gap-2 bg-yellow-100 p-3 border-yellow-400 border-dashed border-2 rounded-md'>
          <div className='w-8 h-8'>
            <FaCcApplePay className='w-full h-full' />
          </div>
          <div className='flex flex-col items-start'>
            <h3 className='text-gray-700 text-xl font-bold'>
              Film Pass
            </h3>
            <p className='text-gray-600'> Get 50% off upto INR 150 on all RuPay card on BookMyShow Stream</p> {/* For promotional purpose */}
        </div>
      </div>
    </div>
  </div>

        <div className="my-8">
          <hr />
        </div>

        {/* Cast Slider */}
        <div className="my-8">
          <h2 className="text-gray-800 font-bold text-2xl mb-4">
            Cast and Crew
          </h2>
          <Slider {...settingCast}>
            {cast.map((castData) => (
              <Cast
                image={castData.profile_path}
                castName={castData.original_name}
                role={castData.character}
              />
            ))}
          </Slider>
        </div>

        <div className="my-8">
          <hr />
        </div>

        {/* recommended movies slider */}
        <div className='my-8'>
          <PosterSlider 
            config= {settings}
            title= "Recommended Movies"
            posters= {recommendedMovies}
            isDark= {false}
          />
        </div>

        <div className="my-8">
          <hr />
        </div>

        {/* recommended movies slider */}
        <PosterSlider 
            config= {settings}
            title= "BMS EXCLUSIVE"
            posters= {recommendedMovies}
            isDark= {false}
          />
  </div>
  </>
 );
};

export default MovieLayoutHoc(MoviePage);