import { Injectable } from '@angular/core';
import { RouteLoc } from '../models/pipeline-loc.model';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapService{
    public mapCenter = { lat: 9.072264, lng: 7.491302 };

  private mapCoords = [
    { lat: 12.9855310000, lng: 7.6171440000 },
    { lat: 12.9855310000, lng: 7.6171480000 },
    { lat: 12.9855310000, lng: 7.6171480000 },
    { lat: 10.9855310000, lng: 10.9971480000 }
   ];
  public mapPaths = [this.mapCoords];

  polylineOptions = {
    path: this.mapCoords,
    strokeColor: '#32a1d0',
    strokeOpacity: 1.0,
    strokeWeight: 2,
  };

    getPolylineOption(data: any) {
        this.polylineOptions.path = data;
        
    }
}