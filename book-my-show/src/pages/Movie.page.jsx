import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import MovieLayoutHoc from '../layout/Movie.layout';
import axios from "axios";
import { MovieContext } from '../context/Movie.context';
import Slider from 'react-slick';
import {FaCcVisa, FaCcApplePay} from "react-icons/fa"; // To get logos of visa & iphone

const MoviePage = () => {
  const {id}= useParams();
  const { movie } = useContext(MovieContext);
  const [cast, setCast]= useState([]);
  const [similarMovies, setSimilarMovies]= useState([]);
  const [recommendedMovies, setRecommendedMovies]= useState([]);

  // calling the API again movie page
  useEffect(() => {
    const requestCast = async () => {
      const getCast = await axios.get(`/movie/${id}/credits`);
      setCast(getCast.data.cast);
    };
    requestCast();
  }, [id]);

  // To trigger similar kind of movies (for promotions)
  useEffect(() => {
    const requestSimilarMovies = async () => {
      const getSimilarMovies = await axios.get(`/movie/${id}/similar`);
      setSimilarMovies(getSimilarMovies.data.cast);
    };
    requestSimilarMovies();
  }, [id]);

  // To trigger recommended movies
  useEffect(() => {
    const requestRecommendedMovies = async () => {
      const getRecommendedMovies = await axios.get(`/movie/${id}/recommendations`);
      setRecommendedMovies(getRecommendedMovies.data.cast);
    };
    requestRecommendedMovies();
  }, [id]);

  const settingCast= {};

  const settings= {};

  return <>
  {/* <MovieHero /> */}
  <div className='my-12 container px-4 lg:ml-20 lg:w-2/3'>
    <div className='flex flex-col items-start gap-3'>
      <h1 className='text-gray-800 font-bold'>About the movie</h1>
      <p>{movie.overview}</p> 
    </div>
    <div className='my-8'>
      <hr />
    </div>

    <div className='my-8'>
      {/* For offer section to buy or rent the movie */}
      <h2 className='text-gray-800 font-bold text-2xl my-3'>Applicable Offers</h2>
      <div className='flex flex-col gap-3 lg:flex-row'>
        {/* For Visa Icon */}
        <div className='flex items-start gap-2 bg-yellow-100 p-3 border-yellow-400 border-dashed border-2 rounded-md'>
          <div className='w-8 h-8'>
            <FaCcVisa className='w-full h-full' />
          </div>
        </div>
      </div>
    </div>
  </div>
  </>

}

export default MovieLayoutHoc(MoviePage)