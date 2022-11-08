import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow } from '@angular/google-maps';
import { PipelineEndpoint } from 'app/api/endpoints/pipeline.endpoint';
import { Pipeline } from 'app/api/models/pipeline.model';
import { GoogleMapService, PolylineOption } from 'app/api/services/google-map.service';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html'
})
  
export class GoogleMapComponent implements OnInit {
  // public
  public contentHeader: object;
  pipelines: Pipeline[] = [];
  polylineOptions: PolylineOption[] = [];
  mapType = 'hybrid';

  companies = [];
  pipelineType = [];
  
  mapCenter: {lat: number, lng: number};

  constructor(
    private pipelineEndPoint: PipelineEndpoint,
    private googleMapService: GoogleMapService) {
    this.mapCenter = this.googleMapService.getMapCenter();
  }

  changeMapType(e: any)
  {
    this.mapType = e.value;
  }

  filterByType(event: any) {
    this.polylineOptions = [];
    const _companies = this.pipelines.filter((item) => item.pipeline_type_id == event.id);

    _companies.forEach((currentValue) => {
      let mapCoords = [];
      let color = currentValue.company.color;

      currentValue.pipeline_routes.forEach((crrntValue) => {
        let lat = parseFloat(crrntValue.lat.toString());
        let lng = parseFloat(crrntValue.long.toString());
        
        mapCoords.push({ lat: lat, lng: lng });
      })
    const lineSymbol = {
      path: 'M -.5,-.5 .5,-.5, .5,.5 -.5,.5',
      scale: 3,
      offset : '50%'
  };
      this.polylineOptions.push({
        path: mapCoords,
          strokeColor: color,
          strokeOpacity: 1.0,
        strokeWeight: 2,
          icons: [
      {
        icon: lineSymbol,
        offset: "50%",
              repeat: "50%",
      },
    ], 
      })
    })
  }

  filterByCompany(event: any) {
    this.polylineOptions = [];

    const _pipelines = this.pipelines.filter((item) => item.company_id == event.id);

    _pipelines.forEach((currentValue) => {
      let mapCoords = [];
      let color = currentValue.company.color;
      const typeId = currentValue.pipeline_type_id;

      currentValue.pipeline_routes.forEach((crrntValue) => {
        let lat = parseFloat(crrntValue.lat.toString());
        let lng = parseFloat(crrntValue.long.toString());
        
        mapCoords.push({ lat: lat, lng: lng });
      })
      this.polylineOptions.push({
        path: mapCoords,
          strokeColor: color,
          strokeOpacity: 1.0,
        strokeWeight: 2,
          icons: [
            {
              icon: this.googleMapService.getIcon(typeId),
              offset: "50%",
              repeat: "50%",
              strokeColor: color,
            },
          ], 
      })
    })
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
          // this.polylineOptions
          const pipelineTypes: any[] = [];
          const companies: any = [];
          this.pipelines.forEach((currentValue: any) => {
            let mapCoords = [];
            let typeId = currentValue.pipeline_type_id;
            let color = currentValue.company.color;
            let companyData = { id: currentValue.company.id, name: currentValue.company.name };
            let typeData = { id: currentValue.pipeline_type.id, name: currentValue.pipeline_type.name }

            let check = companies.find((item) => item.id == companyData.id || item.name == companyData.name);
            if (!check) {
              companies.push(companyData);
            }

            let check1 = pipelineTypes.find((item) => item.id == typeData.id || item.name == typeData.name);
            if (!check1) {
              pipelineTypes.push(typeData);
            }
            
            currentValue.pipeline_routes.forEach((pipelineRoute: any  ) => {
              let lat = parseFloat(pipelineRoute.lat);
              let lng = parseFloat(pipelineRoute.long);
                
              mapCoords.push({ lat: lat, lng: lng });
            });

        this.polylineOptions.push({
          path: mapCoords,
          strokeColor: color,
          strokeOpacity: 1.0,
          strokeWeight: 2,
          icons: [
            {
              icon: this.googleMapService.getIcon(typeId),
              offset: "50%",
              repeat: "50%",
              strokeColor: color,
            },
          ], 
        })
          });
          this.pipelineType = pipelineTypes;
          this.companies = companies;
        },
        error: (error) => console.log('Error: ', error),
      });
  }
}
