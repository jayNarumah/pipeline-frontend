import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow } from '@angular/google-maps';
import { PipelineEndpoint } from 'app/api/endpoints/pipeline.endpoint';
import { Pipeline } from 'app/api/models/pipeline.model';


@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html'
})
export class GoogleMapComponent implements OnInit {
  // public
  public contentHeader: object;
  pipelines: Pipeline[] = [];

  /**
   * Marker Circle Polygon Component
   */
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
  
  selectPipeline(e: any) {
    // this.mapCoords.splice(0, this.mapCoords.length);
    e.value.forEach((currentValue: any  ) => {
      this.mapCoords.push({lat: currentValue.lat, lng: currentValue.long})
    });

    // this.polylineOptions.path = this.mapCoords;
    this.polylineOptions

  }

  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;


  constructor(private pipelineEndPoint: PipelineEndpoint) {
  }
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
          this.pipelines.forEach((currentValue: any  ) => {
      currentValue.pipeline_routes.forEach((pipelineRoute: any  ) => {
        // console.log(pipelineRoute)
        this.mapCoords.push({lat: pipelineRoute.lat, lng: pipelineRoute.long})

    });
    });
        },
        error: (error) => console.log('Error: ', error),
      });
  }
}
