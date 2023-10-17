import React, {createContext, useState} from 'react'

export const MovieContext= createContext(); // contains movie info

const MovieProvider = ({children}) => {
  const [movie, setMovie]= useState({
    id: 0,
    original_title: "",
    overview: "",
    backdrop_path: "",
    poster_path: "",
  }); // It is a template so everything is kept blank
  return <MovieContext.Provider value= {{movie, setMovie}}> {children} </MovieContext.Provider> // Fetching info for children
};


export default MovieProvider;