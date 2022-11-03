import { Injectable } from '@angular/core';
import { RouteLoc } from '../models/pipeline-loc.model';

export class polylineOption{
  path: any; 
  strokeColor: string = '#32a1d0';
  strokeOpacity: number = 1.0;
  strokeWeight: number = 2;
}

const mapCenter = { lat: 9.072264, lng: 7.491302 };

// const mapCoords = new google.maps.MVCArray();
const mapCoords = [
  { lat: 12.9855310000, lng: 7.6171440000 },
  { lat: 12.9855310000, lng: 7.6971480000 },
  { lat: 12.9955310000, lng: 7.9999480000 },
  { lat: 10.9855310000, lng: 10.9971480000 },
  // ['12°10.2144′ N', '6°39.8472′ E']
]
    
const polylineOptions: polylineOption = {
    path: mapCoords,
    strokeColor: '#32a1d0',
    strokeOpacity: 1.0,
    strokeWeight: 2,
  }

@Injectable({
  providedIn: 'root'
})
export class GoogleMapService {

  constructor() {
    // mapCoords.push({ lat: 12.9855310000, lng: 7.6171440000 });
    // mapCoords.push({ lat: 12.9855310000, lng: 7.6171480000 });
    // mapCoords.push({ lat: 12.9855310000, lng: 7.6171480000 });
    // mapCoords.push({ lat: 10.9855310000, lng: 10.9971480000 });
  }

  getPolylineOptions(): polylineOption {
    return polylineOptions;
  }

  selectPolylineOptions() {
    mapCoords.splice(0, mapCoords.length - 1);
    mapCoords.forEach((currentValue) => { 

      mapCoords.push(currentValue);
    });
    console.log(polylineOptions)
    return polylineOptions;
  }

  getMapCenter() {
    return mapCenter;
  }
}