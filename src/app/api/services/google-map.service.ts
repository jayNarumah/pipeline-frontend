import { Injectable } from '@angular/core';
import { RouteLoc } from '../models/pipeline-loc.model';

export class PolylineOption{
  path: any; 
  strokeColor: string = '#32a1d0';
  strokeOpacity: number = 1.0;
  strokeWeight: number = 2;
  icons?: any;
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
    
const polylineOptions: PolylineOption = {
    path: mapCoords,
    strokeColor: '#32a1d0',
    strokeOpacity: 1.0,
    strokeWeight: 2,
  }

@Injectable({
  providedIn: 'root'
})
export class GoogleMapService {

  icons = [
    {
      path: "M -.5,-.5 .5,-.5, .5,.5 -.5,.5",
      scale: 3,
      strokeColor: "#ffffff",
      offset : '50%'
    },
    {
      path: "M -2,0 0,-2 2,0 0,2 z",
      scale: 3,
      strokeColor: "#ffffff",
      offset : '50%'
    },
    {
      path: "M -1,0 A 1,1 0 0 0 -3,0 1,1 0 0 0 -1,0M 1,0 A 1,1 0 0 0 3,0 1,1 0 0 0 1,0M -3,3 Q 0,5 3,3",
      scale: 3,
      strokeColor: "#ffffff",
      offset : '50%'
    },
    {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 3,
      strokeColor: "#ffffff",
      offset : '50%'
    },
    {
      path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
      scale: 3,
      strokeColor: "#ffffff",
      offset : '50%'
    },
    {
      path: 'M -.5,-.5 .5,-.5, .5,.5 -.5,.5',
      scale: 3,
      strokeColor: "#ffffff",
      offset : '50%'
    },
   ];

  constructor() {
  }

  getPolylineOptions(): PolylineOption {
    return polylineOptions;
  }
  getIcon(index) {
    console.log(this.icons[index-1])
    return (this.icons[index - 1]);
  }

  selectPolylineOptions() {
    mapCoords.splice(0, mapCoords.length - 1);
    mapCoords.forEach((currentValue) => { 

      mapCoords.push(currentValue);
    });
    
    return polylineOptions;
  }

  getMapCenter() {
    return mapCenter;
  }
}