import { Component, enableProdMode, OnInit } from '@angular/core';
import { PipelineEndpoint } from 'api/endpoint/pipeline.endpoint';
import { PipelineRoute } from 'api/resource/pipeline-route.model';
import { RouteLoc } from 'api/resource/pipeline-loc.model';
import { Pipeline } from 'api/resource/pipeline.model';
import { Marker, Route, MapService } from './map.service';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'app-map',
  providers: [MapService],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  preserveWhitespaces: true,
})
export class MapComponent implements OnInit {
  routes: Route[];
  pipelines: Pipeline[] = []
  pipelineData: RouteLoc[] = [];

  markers: Marker[];

  constructor(service: MapService, private pipelineEndPoint: PipelineEndpoint) {
    this.markers = service.getMarkers();
    this.routes = service.getRoutes();
  }

  ngOnInit(): void {
    this.pipelineEndPoint.list()
      .subscribe({
        next: (response) => {
          this.pipelines = response.data;
          // console.log('Error: ', this.pipelines)

        },
        error: (error) => console.log('Error: ', error),
      });
  }

  setMode(e: any) {
    this.routes = this.routes.map((item) => {
      item.mode = e.value;
      return item;
    });
  }

  selectColor(e: any) {
    this.routes = this.routes.map((item) => {
      item.color = e.value;
      return item;
    });
  }
  selectPipeline(e: any) {
    // this.pipelineData = [];
    this.pipelineData.splice(0, this.pipelineData.length);
    // console.log('Event:', e.value);
    e.value.forEach((currentValue: any  ) => {
      this.pipelineData.push({lat: currentValue.lat, lng: currentValue.long})

    });
    this.routes = this.routes.map((item) => {
      item.locations = this.pipelineData
      console.log('Data',this.pipelineData)
      return item;
    });
  }

  allRoutes() {
    this.pipelineData.splice(0, this.pipelineData.length);
    this.pipelines.forEach((currentValue: any  ) => {
      currentValue.pipeline_routes.forEach((pipelineRoute: any  ) => {
        // console.log(pipelineRoute)
        this.pipelineData.push({lat: pipelineRoute.lat, lng: pipelineRoute.long})

    });
    });

    this.routes = this.routes.map((item) => {
      item.locations = this.pipelineData
      console.log('Data',this.pipelineData)
      return item;
    });
    // console.log(this.pipelineData)
  }
}
