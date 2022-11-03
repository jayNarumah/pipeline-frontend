import { Injectable } from '@angular/core';

export class Marker {
  location: any;
}

export class Route {
  weight: number = 0;

  color: string = '';

  opacity: number = 1;

  mode: string = '';

  locations: any;
}

const markers: Marker[] = [{
  location: [40.755833, -73.986389],
}, {
  location: {
    lat: 40.753889,
    lng: -73.981389,
  },
}, {
  location: 'Brooklyn Bridge,New York,NY',
}];

const routes: Route[] = [{
  weight: 6,
  color: 'blue',
  opacity: 0.5,
  mode: '',
  locations: [
    { lat: 12.9855310000, lng: 7.6171440000 },
    { lat: 12.9855310000, lng: 7.6171480000 },
    { lat: 12.9855310000, lng: 7.6171480000 },
    { lat: 10.9855310000, lng: 10.9971480000 },
    ['12°10.2144′ N', '6°39.8472′ E']
  ],
}];

@Injectable()
export class MapService {
  getMarkers(): Marker[] {
    return markers;
  }

  getRoutes(): Route[] {
    return routes;
  }
}
