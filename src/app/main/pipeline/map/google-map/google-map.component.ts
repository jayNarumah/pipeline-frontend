import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow } from '@angular/google-maps';
import { PipelineEndpoint } from 'app/api/endpoints/pipeline.endpoint';
import { Pipeline } from 'app/api/models/pipeline.model';
import { GoogleMapService, polylineOption } from 'app/api/services/google-map.service';


@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html'
})
export class GoogleMapComponent implements OnInit {
  // public
  public contentHeader: object;
  pipelines: Pipeline[] = [];
  polylineOptions: polylineOption[] = [];
  mapType = 'hybrid';
  // mapCoords;
  // public mapCenter = { lat: 9.072264, lng: 7.491302 };
  mapCenter: {lat: number, lng: number};

  constructor(
    private pipelineEndPoint: PipelineEndpoint,
    private googleMapService: GoogleMapService) {
    this.mapCenter = this.googleMapService.getMapCenter();
    // this.polylineOptions = this.googleMapService.getPolylineOptions();
    // console.log(this.polylineOptions)
  }

  // private mapCoords = [
  //   { lat: 14.9855310000, lng: 7.6171440000 },
  //   { lat: 14.9855310000, lng: 7.6171480000 },
  //   { lat: 14.9855310000, lng: 7.6171480000 },
  //   { lat: 10.9855310000, lng: 10.9971480000 }
  //  ];  

  // polylineOptions = {
  //   path: this.mapCoords,
  //   strokeColor: '#32a1d0',
  //   strokeOpacity: 1.0,
  //   strokeWeight: 2,
  // };
  
  allPipelines() {

    // this.pipelineData.splice(0, this.pipelineData.length);
    // this.routes.splice(0, this.routes.length);
    // this.pipelines.forEach((currentValue: any  ) => {
    //   currentValue.pipeline_routes.forEach((pipelineRoute: any  ) => {
    //     // console.log(pipelineRoute)
    //     this.pipelineData.push({lat: pipelineRoute.lat, lng: pipelineRoute.long})

    // });
    // });

    // this.routes.push(
    //   {
    //     weight: 6,
    //     color: 'blue',
    //     opacity: 0.5,
    //     mode: '',
    //     locations: this.pipelineData,
    //   }
    // );

    // this.routes = this.routes.map((item) => {
    //   item.locations = this.pipelineData
    //   console.log('Data',this.pipelineData)
    //   return item;
    // });
    // console.log(this.pipelineData)
  }


  changeMapType(e: any)
  {
    console.log(e)
    this.mapType = e.value;
  }

  selectPipeline(e: any) {
    let mapCoords = [];

    e.value.forEach((currentValue: any) => {
      
      let lat = parseFloat(currentValue.lat);
      let lng = parseFloat(currentValue.long)

      mapCoords.push({ lat: lat, lng: lng })
    });
    //to update the polyline path in the display
  //   this.polylineOptions = {
  //   path: mapCoords,
  //   strokeColor: '#32a1d0',
  //   strokeOpacity: 1.0,
  //   strokeWeight: 2,
  // };

    // this.polylineOptions.path = mapCoords;
    // console.log(this.polylineOptions);
  }

  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  /**
   * On init
   */
  ngOnInit(): void {
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
          this.polylineOptions
          this.pipelines.forEach((currentValue: any) => {
            let mapCoords = [];
        currentValue.pipeline_routes.forEach((pipelineRoute: any  ) => {
        // console.log(pipelineRoute)
        let lat = parseFloat(pipelineRoute.lat);
        let lng = parseFloat(pipelineRoute.long);
          
          mapCoords.push({ lat: lat, lng: lng });
        // this.mapCoords.push({lat: pipelineRoute.lat, lng: pipelineRoute.long})

        });
        this.polylineOptions.push({
          path: mapCoords,
          strokeColor: '#32a1d0',
          strokeOpacity: 1.0,
          strokeWeight: 2,
        })
          });
          console.log(this.polylineOptions)
        },
        error: (error) => console.log('Error: ', error),
      });
  }
}
