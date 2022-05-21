import React, {useState} from 'react'
import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions';
const accessToken = 'pk.eyJ1IjoibWFtZW5jb2RlIiwiYSI6ImNrbmMyNDhmbzF4ZHIyd282NDJ5cDl4dmEifQ.kB0rN0t8PgA822CqczbbqQ';
const directionsClient = MapboxDirectionsFactory({accessToken});


function useDistance(startLoc, destLoc) {
    const [distance, setDistance]= useState()
    const [duration, setDuration]= useState()


    const reqOptions = {
        waypoints: [
          {coordinates: startLoc},
          {coordinates: destLoc},
        ],
        profile: 'driving',
        geometries: 'geojson',
      };


      directionsClient.getDirections(reqOptions).send().then((response)=> {

        //console.log(response.body.routes[0].distance)
          setDistance(response.body.routes[0].distance);
          setDuration(response.body.routes[0].duration);
        })


  return {distance, duration}
   
}

export default useDistance