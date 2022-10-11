import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxMapModule, DxSelectBoxModule } from 'devextreme-angular';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { BarcodeComponent } from './barcode/barcode.component';
import { BarcodeScannerLivestreamModule } from 'ngx-barcode-scanner';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    BarcodeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgSelectModule,
    BarcodeScannerLivestreamModule,
    DxMapModule,
    DxSelectBoxModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
