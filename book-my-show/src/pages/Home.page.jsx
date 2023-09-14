import React, { useState } from 'react';

// Components
import EntertainmentCard from '../components/Entertainment/EntertainmentCard.Component';
import HeroCarousel from '../components/HeroCarousel/HeroCarousel.Component';
import PosterSlider from '../components/PosterSlider/PosterSlider.Component';

import DefaultLayoutHoc from '../layout/Default.layout' //Layout HOC

const HomePage = () => {

    const [recommendedMovies, setRecommendedMovies]= useState([])
    const [premierMovies, setPremierMovies]= useState([])
    const [onlineStreamEvents, setOnlineStreamEvents]= useState([])

  return (
    <>
       <HeroCarousel />
     {/*Adding Tailwind properties*/}
     <div className='container mx-auto px-4 md:px-12 my-8'>
        <h1 className='text-2xl font-bold text-gray-800 sm:ml-3 ml-0 my-3'>The best of Entertainment</h1>
        <EntertainmentCard /> {/* so that we can scroll among cards accordingly */}
     </div>
     <div className='container mx-auto px-4 md:px-12 my-8'>
        <PosterSlider
        title= "Recommended Movies"
        subTitle= "List of recommended movies"
        posters= {recommendedMovies}
        isDark= {false}
        />
     </div>

    {/* For Premier */}
     <div className='bg-premier-800 py-12'>
      <div className='container mx-auto px-4 md:px-12 my-8 flex flex-col gap-3'>
        <div className='hidden md:flex'>
          <img src='https://in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120/premiere-rupay-banner-web-collection-202104230555.png' alt='Rupay' className='w-full h-full' />
        </div>
        <div className='container mx-auto px-4 md:px-12 my-8 flex flex-col gap-3'>
        <PosterSlider
        title= "Premiers"
        subTitle= "Brand new releases every Friday"
        posters= {premierMovies}
        isDark= {true}
        />
        </div>
      </div>
     </div>

     {/* For Online streaming events */}
     <div className='container mx-auto px-4 md:px-12 my-8'>
     <PosterSlider
        title= "Online Streaming Events"
        subTitle= ""
        posters= {onlineStreamEvents}
        isDark= {false}
        />
     </div>
    </>
  )
}

export default DefaultLayoutHoc(HomePage)