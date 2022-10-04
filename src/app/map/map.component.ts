import { Component, enableProdMode } from '@angular/core';
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
export class MapComponent {
  routes: Route[];

  markers: Marker[];

  constructor(service: MapService) {
    this.markers = service.getMarkers();
    this.routes = service.getRoutes();
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
}
