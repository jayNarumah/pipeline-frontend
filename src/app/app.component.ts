import { Component, enableProdMode } from '@angular/core';

import { Marker, Route, Service } from './app.service';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'demo-app',
  providers: [Service],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  preserveWhitespaces: true,
})

export class AppComponent {
  routes: Route[];

  markers: Marker[];

  constructor(service: Service) {
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




