import { Component, enableProdMode, OnInit } from '@angular/core';
import { PipelineEndpoint } from 'api/endpoint/pipeline.endpoint';
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
console.log('Event:', e.value)
  }
}
