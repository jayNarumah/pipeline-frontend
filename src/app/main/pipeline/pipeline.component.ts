import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';

import { PipelineRouteEndpoint } from 'app/api/endpoints/pipeline-route.endpoint';
import { PipelineTypeEndpoint } from 'app/api/endpoints/pipeline-type.endpoint';
import { PipelineEndpoint } from 'app/api/endpoints/pipeline.endpoint';
import { Company } from 'app/api/models/company.model';
import { Pipeline } from 'app/api/models/pipeline.model';
import { PipelineType } from 'app/api/models/pipeline-type.model';
import { PipelineRoute } from 'app/api/models/pipeline-route.model';
import { CompanyEndpoint } from 'app/api/endpoints/company.endpoint';
import { MapService, Marker, Route } from 'app/api/services/map.service';
import { RouteLoc } from 'app/api/models/pipeline-loc.model';

@Component({
  selector: 'app-pipeline',
  providers: [MapService],
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.scss']
})
export class PipelineComponent implements OnInit {
  contentHeader: object;

  @BlockUI() blockUI: NgBlockUI;

  pipelineForm: FormGroup;
  displaySectionForm = false;
  displayMap = false;
  formRequestData: Pipeline;
  id?: number;
  routes: Route[];
  markers: Marker[];
  pipelineData: RouteLoc[] = [];

  canShowPipelineForm = true;
  canShowConfirmationForm = false;
  canSubmitPipelineForm = false;
  pipelines: Pipeline[] = [];
  companies: Company[] = [];
  pipelineType = [];
  pipelineRoute: PipelineRoute[] = [];
  data: Pipeline[] = [];
  operation = 'Add';

  latRange(control: FormControl): { [s: string]: boolean } {
    if (control.value < -90 || control.value > 90) {
      return { 'invLat': true};
    }
    return null;
  }
  
  longRange(control: FormControl): { [s: string]: boolean } {
    if (control.value < -180 || control.value > 180) {
      return { 'invLong': true};
    }
    return null;
  }

  constructor(
    private pipelineEndpoint: PipelineEndpoint,
    private fb: FormBuilder,
    private readonly companyEndPoint: CompanyEndpoint,
    service: MapService,
    private readonly pipelineTypeEndpoint: PipelineTypeEndpoint,

  ) {
    this.pipelineForm = this.fb.group({
      pipeline_type_id: this.fb.control(null, Validators.required),
      company_id: this.fb.control(null, Validators.required),
      name: this.fb.control(null, Validators.required),
      size: this.fb.control(null, Validators.required),
      start_lat: this.fb.control(null, [Validators.required, this.latRange.bind(this)]),
      end_lat: this.fb.control(null, [Validators.required, this.latRange.bind(this)]),
      start_long: this.fb.control(null, [Validators.required, this.longRange.bind(this)]),
      end_long: this.fb.control(null, [Validators.required, this.longRange.bind(this)]),
      lat: this.fb.array([]),
      long: this.fb.array([]),
    });

    this.markers = service.getMarkers();
    this.routes = service.getRoutes();

    this.loadItem = this.loadItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.loadMap = this.loadMap.bind(this);
  }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Pipeline',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/landing'
          },
          {
            name: 'Dashboard',
            isLink: true,
            link: '/dashboard/ecommerce'
          },
          {
            name: 'Pipeline',
            isLink: false
          }
        ]
      }
    };

    this.blockUI.start("Loading...");

    this.pipelineEndpoint.list()
      .subscribe({
        next: (response) => {
          this.data = response.data;
          console.log(this.data)
          this.blockUI.stop();
        },
        error: (error) => this.blockUI.stop(),
      });

    this.pipelineTypeEndpoint.list()
      .subscribe({
        next: (response) => {
          this.pipelineType = response.data;
          console.log('Pipeline-Type',this.pipelineType)
          this.blockUI.stop();
        },
        error: (error) => console.log(error),
      });
    
     this.companyEndPoint.list()
      .subscribe({
        next: (response) => {
          this.companies = response.data;
          console.log('Companies',this.companies)
          this.blockUI.stop();
        },
        error: (error) => console.log(error),
      });
  }
  
  addCoordinate() {
    const latControl = new FormControl(null, [Validators.required, this.latRange.bind(this)]);
    const longControl = new FormControl(null, [Validators.required, this.longRange.bind(this)]);

    (<FormArray>this.pipelineFormControls['lat']).push(latControl);
    (<FormArray>this.pipelineFormControls['long']).push(longControl);
  }

  showPipelineTypeName() {
    let i = this.pipelineFormControls['pipeline_type_id'].value;

    return this.data[i - 1].name;
  }

  showCompanyName() {
    let i = this.pipelineFormControls['company_id'].value;

    return this.data[i - 1].name;
  }

  processForm() {
    console.log("Log")
    const formData: Pipeline = {
      pipeline_type_id: this.pipelineFormControls['pipeline_type_id'].value,
      company_id: this.pipelineFormControls['company_id'].value,
      name: this.pipelineFormControls['name'].value,
      size: this.pipelineFormControls['size'].value,
      start_lat: this.pipelineFormControls['start_lat'].value,
      end_lat: this.pipelineFormControls['end_lat'].value,
      start_long: this.pipelineFormControls['start_long'].value,
      end_long: this.pipelineFormControls['end_long'].value,
      lat: this.pipelineFormControls['lat'].value,
      long: this.pipelineFormControls['long'].value,
    };
    this.formRequestData = formData;

    console.warn(formData);

    setTimeout(() => this.showConfirmationForm(), 250);
  }

  processFormRequest() {
    Swal.close();
    Swal.showLoading();
    // Make Request to API
    // this.logger.log("Payload to be Sent");
    let httpCall =
      this.operation === 'Update'
        ? this.pipelineEndpoint.update(this.id, this.formRequestData)
        : this.pipelineEndpoint.create(this.formRequestData);
    // this.operation === "Update" ?
    // this.halltypeService.update(this.id, this.formRequestData) : this.halltypeService.create(this.formRequestData)
    httpCall.subscribe({
      next: (response) => {
        if (this.operation === 'Update') {
          this.operation = 'Add';
          this.data[this.id - 1] = this.formRequestData;

        }
        else {
          this.data.push(response.data);
        }
        Swal.hideLoading();
        this.hideForm();
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Operation successful',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        });
      },
      error: (error) => {
        console.log("An error occurred while attempting to submit data...");
        console.log(error);
        Swal.hideLoading();
        Swal.fire(
          'Error',
          error.message || error,
          'error'
        );
      },
    });
  }

  showConfirmationForm() {
    this.canShowPipelineForm = false;
    this.canShowConfirmationForm = true;
    this.displayMap = false;
  }

  editForm() {
    this.canShowPipelineForm = true;
    this.canShowConfirmationForm = false;
    this.displaySectionForm = true;
    this.displayMap = false;
  }

  closeMap() {
    this.displayMap = false;
  }

  newRecord() {
    this.displayMap = false;
    this.displaySectionForm = true;
  }

  hideForm() {
    this.displaySectionForm = false;
    this.canShowConfirmationForm = false;
    this.pipelineForm?.reset();
  }

  get pipelineFormControls() {
    return this.pipelineForm.controls;
  }

  loadItem(event) {
    this.operation = "Update";
    this.newRecord();
    const pipelineData = this.data.find(
      item => item.id === event.row.data.id
    );

    this.id = event.row.data.id;

    this.pipelineForm.patchValue({
      pipeline_type_id: pipelineData.pipeline_type_id,
      company_id: pipelineData.company_id,
      name: pipelineData.name,
      size: pipelineData.size,
      start_lat: pipelineData.start_lat,
      end_lat: pipelineData.end_lat,
      start_long: pipelineData.start_long,
      end_long: pipelineData.end_long,
    });
  }

  loadMap(event)
  {
    this.displayMap = true;
    const pData = this.data.find(
      item => item.id === event.row.data.id
    );

    this.id = event.row.data.id;

    // console.log('Event Data: ', pData.pipeline_routes)
    this.pipelineData.splice(0, this.pipelineData.length);
    // console.log('Event:', e.value);
    pData.pipeline_routes.forEach((currentValue: any  ) => {
      this.pipelineData.push({lat: currentValue.lat, lng: currentValue.long})

    });
    this.routes = this.routes.map((item) => {
      item.locations = this.pipelineData
      console.log('Data',this.pipelineData)
      return item;
    });
  }
  deleteItem(event) {
    Swal.fire({
      title: 'Delete',
      text: "Are you sure you want to delete this record?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      }
    }).then(result => {
      if (result.value) {
        this.pipelineEndpoint.delete(event.row.data.id).subscribe(
          success => {
            this.data = this.data.filter(
              e => e.id !== event.row.data.id
            );
            // this.alert.success('Record deleted');
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Your record has been deleted.',
              customClass: {
                confirmButton: 'btn btn-success'
              }
            });
          },
          error => {
            Swal.fire({
              icon: 'error',
              title: 'Error!!',
              text: error,
              customClass: {
                confirmButton: 'btn btn-danger'
              }
            });
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }
}
