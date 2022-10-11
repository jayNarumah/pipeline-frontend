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
    [40.782500, -73.966111],
    {lat: 40.782501, lng: -73.966112},
    [40.755833, -73.986389],
    [40.753889, -73.981389],
    'Brooklyn Bridge,New York,NY',
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
