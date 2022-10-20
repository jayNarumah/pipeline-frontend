import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { DxMapModule, DxSelectBoxModule, DxButtonModule, DxChartModule, DxCheckBoxModule, DxDataGridModule, DxDateBoxModule, DxFileUploaderModule, DxFormModule, DxFunnelModule, DxPieChartModule, DxPivotGridModule, DxSpeedDialActionModule, DxTabPanelModule, DxTemplateModule, DxTextAreaModule, DxToolbarModule } from 'devextreme-angular';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { PipelineComponent } from './pipeline.component';
import { PipelineRouteComponent } from './pipeline-route/pipeline-route.component';
import { PipelineTypeComponent } from './pipeline-type/pipeline-type.component';
import { CompanyComponent } from '../company/company.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
    {
      path: 'pipeline-route',
      component: PipelineRouteComponent
  },
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
];
@NgModule({
  declarations: [
    PipelineComponent,
    PipelineRouteComponent,
    PipelineTypeComponent,
    CompanyComponent,
    MapComponent,
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
  ],
  providers: []
})
export class PipelineModule {}