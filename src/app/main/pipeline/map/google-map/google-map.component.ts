import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { PipelineEndpoint } from 'app/api/endpoints/pipeline.endpoint';
import { Pipeline } from 'app/api/models/pipeline.model';

import * as snippet from 'app/main/pipeline/map/google-map/google-maps.snippetcode';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html'
})
export class GoogleMapComponent implements OnInit {
  // public
  public contentHeader: object;
  pipelines: Pipeline[] = [];

  public _snippetCodeBasic = snippet.snippetCodeBasic;
  public _snippetCodeMarkerCirclePolygon = snippet.snippetCodeMarkerCirclePolygon;
  public _snippetCodeAdvance = snippet.snippetCodeAdvance;
  public _snippetCodeUserLocation = snippet.snippetCodeUserLocation;
  public _snippetCodeCustomIcon = snippet.snippetCodeCustomIcon;
  public _pipelineRoutes = snippet.pipelineRouteAdvance;
  public _snippetCodeMarkerWithTooltip = snippet.snippetCodeMarkerWithTooltip;

  /**
   * Marker Circle Polygon Component
   */
  public mapCenter = { lat: 25.0, lng: 12.0 };

  private mapCoords = [
    { lat: 13, lng: 13 },
    { lat: -13, lng: 2 },
    { lat: 13, lng: -13 },
    { lat: 13, lng: -19 }
   ];
  public mapPaths = [this.mapCoords];

  polylineOptions = {
path: this.mapCoords,
strokeColor: '#32a1d0',
strokeOpacity: 1.0,
strokeWeight: 2,
  };
  
  selectPipeline(e: any) {
    console.log(e)
    this.mapCoords.splice(0, this.mapCoords.length);
    e.value.forEach((currentValue: any  ) => {
      this.mapCoords.push({lat: currentValue.lat, lng: currentValue.long})
    });

    this.polylineOptions.path = this.mapCoords;
    console.log(this.polylineOptions)
  }

  public markerCirclePolygonCenter = { lat: 37.421995, lng: -122.084092 };
  public markerCirclePolygonZoom = 15;
  public mapCircleCenter: google.maps.LatLngLiteral = { lat: 37.421995, lng: -122.084092 };

  // public mapCircleOptions = {
  //   strokeColor: 'red',
  //   strokeOpacity: 0.8,
  //   strokeWeight: 2,
  //   radius: 200,
  //   fillColor: '#3164bf',
  //   fillOpacity: 0.35,
  //   draggable: true,
  //   center: { lat: 37.421995, lng: -122.084092 }
  // };
   


  // Define the LatLng coordinates for the polygon's  outer path.
  private polygonCoords = [
    { lat: 37.421834, lng: -122.079971 },
    { lat: 37.421672, lng: -122.07273 },
    { lat: 37.419884, lng: -122.079213 }
  ];

  // public mapPolygonPaths = [this.polygonCoords];

  // public mapPolygonOptions = {
  //   strokeColor: 'red',
  //   strokeOpacity: 0.8,
  //   strokeWeight: 2,
  //   radius: 200,
  //   fillColor: '#3164bf',
  //   fillOpacity: 0.35,
  //   draggable: true,
  //   center: { lat: 37.421995, lng: -122.084092 }
  // };

  // /**
  //  * Advance Component
  //  */
  // public advanceZoom = 9;
  // public advanceCenter: google.maps.LatLngLiteral = { lat: 44.541012, lng: -78.547917 };
  // public advanceOptions: google.maps.MapOptions = {
  //   maxZoom: 17,
  //   minZoom: 2
  // };
  // public advanceRectangleBounds = {
  //   north: 44.599,
  //   south: 44.49,
  //   east: -78.443,
  //   west: -78.649
  // };
  // public advanceRectangleOptions = { editable: true };

  // /**
  //  * User Location Component
  //  */
  // public userLocationZoom = 15;
  // public userLocationCenter: google.maps.LatLngLiteral;

  /**
   * Custom Icons Component
   */
  // public customIconZoom = 13;
  // public customIconCenter: google.maps.LatLngLiteral = { lat: 37.421995, lng: -122.084092 };
  // public customIcon2Center: google.maps.LatLngLiteral = { lat: 37.431997, lng: -122.094097 };
  // private customIconPath = 'assets/images/misc/';
  // customIconOptions = {
  //   icon: this.customIconPath + 'leaf-red.png'
  // };
  // customIcon2Options = {
  //   icon: this.customIconPath + 'leaf-green.png'
  // };

  /**
   * Marker with Tooltip Component
   */
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  public markerZoom = 12;
  public streetZoom = 12;
  public markerCenter: google.maps.LatLngLiteral = {
    lat: 47.4073,
    lng: 7.76
  };

  // public markers: object[] = [
  //   {
  //     position: {
  //       lat: 47.4073,
  //       lng: 7.76
  //     },
  //     options: {
  //       draggable: true
  //     },
  //     label: 'A'
  //   },
  //   {
  //     position: {
  //       lat: 47.3769,
  //       lng: 7.7417
  //     },
  //     options: {
  //       draggable: true
  //     },
  //     label: 'B'
  //   }
  // ];

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Advance Component
   */
  // zoomIn() {
  //   if (this.advanceZoom < this.advanceOptions.maxZoom) this.advanceZoom++;
  // }

  // zoomOut() {
  //   if (this.advanceZoom > this.advanceOptions.minZoom) this.advanceZoom--;
  // }

  // /**
  //  * Marker with Tooltip Component
  //  * @param marker
  //  */
  // openInfo(marker: MapMarker) {
  //   this.infoWindow.open(marker);
  // }

  constructor(private pipelineEndPoint: PipelineEndpoint) {
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Fetch Geolocation
    // navigator.geolocation.getCurrentPosition(position => {
    //   this.userLocationCenter = {
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude
    //   };
    //   console.log('Position: ', position)
    // });

    // content header
    this.contentHeader = {
      headerTitle: 'Google Map',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Dashboard',
            isLink: true,
            link: '/dashboard/ecommerce'
          },
          {
            name: 'Google Maps',
            isLink: false
          }
        ]
      }
    };
    this.pipelineEndPoint.list()
      .subscribe({
        next: (response) => {
          this.pipelines = response.data;
        },
        error: (error) => console.log('Error: ', error),
      });
  }
}