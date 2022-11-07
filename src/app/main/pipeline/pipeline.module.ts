import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreCommonModule } from '@core/common.module';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { DxMapModule, DxSelectBoxModule, DxButtonModule, DxChartModule, DxCheckBoxModule, DxDataGridModule, DxDateBoxModule, DxFileUploaderModule, DxFormModule, DxFunnelModule, DxPieChartModule, DxPivotGridModule, DxSpeedDialActionModule, DxTabPanelModule, DxTemplateModule, DxTextAreaModule, DxToolbarModule } from 'devextreme-angular';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { PipelineComponent } from './pipeline.component';
import { PipelineTypeComponent } from './pipeline-type/pipeline-type.component';
import { CompanyComponent } from '../company/company.component';
import { MapComponent } from './map/map.component';
import { GoogleMapComponent } from './map/google-map/google-map.component';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { GenColorService } from 'app/api/services/generate-color.service';

const routes: Routes = [
  {
    path: 'pipeline-type',
    component: PipelineTypeComponent
  },
  {
    path: 'pipeline',
    component: PipelineComponent,
  },
  {
      path: 'company',
      component: CompanyComponent
  },
  {
      path: 'map',
      component: MapComponent
  },
  {
    path: 'google-map',
    component: GoogleMapComponent,
    data: { animation: 'maps' }
  },
];
@NgModule({
  declarations: [
    PipelineComponent,
    PipelineTypeComponent,
    CompanyComponent,
    MapComponent,
    GoogleMapComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DxMapModule,
    ContentHeaderModule,
    NgSelectModule,
    DxSpeedDialActionModule,
    DxPivotGridModule,
    DxChartModule,
    DxCheckBoxModule,
    DxPieChartModule,
    DxFileUploaderModule,
    DxFunnelModule,
    DxTabPanelModule,
    DxButtonModule,
    DxToolbarModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxFormModule,
    DxDataGridModule,
    DxSpeedDialActionModule,
    DxFileUploaderModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxTemplateModule,
    ReactiveFormsModule,
    CardSnippetModule,
    CoreCommonModule,
    GoogleMapsModule
  ],
  providers: [GoogleMap, GenColorService]
})
export class PipelineModule {}