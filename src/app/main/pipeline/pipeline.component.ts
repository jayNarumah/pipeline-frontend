import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';

import { PipelineTypeEndpoint } from 'app/api/endpoints/pipeline-type.endpoint';
import { PipelineEndpoint } from 'app/api/endpoints/pipeline.endpoint';
import { Company } from 'app/api/models/company.model';
import { Pipeline } from 'app/api/models/pipeline.model';
import { PipelineRoute } from 'app/api/models/pipeline-route.model';
import { CompanyEndpoint } from 'app/api/endpoints/company.endpoint';
import { RouteLoc } from 'app/api/models/pipeline-loc.model';
import { PipelineService } from 'app/api/services/pipeline.service';
import { GoogleMapService, PolylineOption } from 'app/api/services/google-map.service'; 

@Component({
  selector: 'app-pipeline',
  providers: [PipelineService],
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.scss']
})
export class PipelineComponent implements OnInit {
  contentHeader: object;

  @BlockUI() blockUI: NgBlockUI;

  pipelineForm: FormGroup;
  operation = 'Add';
  id?: number;
  index: number = 0;
  pipelineName: string;

  pipelineData: RouteLoc[] = [];
  pipelines: Pipeline[] = [];
  companies: Company[] = [];
  pipelineType = [];
  pipelineRoute: PipelineRoute[] = [];
  formRequestData: Pipeline;
  data: Pipeline[] = [];
  public mapCenter;

  polylineOptions: PolylineOption[] = [];
  polyline: PolylineOption;
  // routesData: RouteLoc[] = [];

  canShowConfirmationForm = false;
  canSubmitPipelineForm = false;
  canShowPipelineForm = true;
  displaySectionForm = false;
  displayMap = false;
  errorMsg = false;

  constructor(
    private pipelineEndpoint: PipelineEndpoint,
    private fb: FormBuilder,
    private readonly companyEndPoint: CompanyEndpoint,
    // service: MapService,
    private pipelineService: PipelineService,
    private readonly pipelineTypeEndpoint: PipelineTypeEndpoint,
    private googleMapService: GoogleMapService,

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
      lat: this.fb.array([], [this.latRange.bind(this), this.isValidNumber.bind(this)]),
      long: this.fb.array([], [this.longRange.bind(this)]),
    });
    // this.markers = service.getMarkers();
    // this.routes = service.getRoutes();
    this.mapCenter = this.googleMapService.getMapCenter();

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
          this.pipelineService.allRoutes(this.data);
          this.blockUI.stop();
        },
        error: (error) => this.blockUI.stop(),
      });

    this.pipelineTypeEndpoint.list()
      .subscribe({
        next: (response) => {
          this.pipelineType = response.data;
          this.blockUI.stop();
        },
        error: (error) => this.blockUI.stop(),
      });
    
     this.companyEndPoint.list()
      .subscribe({
        next: (response) => {
          this.companies = response.data;
          this.blockUI.stop();
        },
        error: (error) => this.blockUI.stop(),
      });
  }

  isValidNumber(control: FormControl): { [s: string]: boolean }{
    const num = new Number(control.value).valueOf();
    let numbr = typeof num;
    console.log(num === NaN)
    // new Node(num === NaN)
    if (num === NaN && control.value != '') {
      return { 'invNumber': true };
    }
    return null;
  }

  //custome validator accept only latitude values(-90 to 90)
  latRange(control: FormControl): { [s: string]: boolean } {
    if (control.value < -90 || control.value > 90 ) {
      return { 'invLat': true};
    }
    return null;
  }
  
  //custome validator accept only longitude values(-180 to 180)
  longRange(control: FormControl): { [s: string]: boolean } {
    if (control.value < -180 || control.value > 180) {
      return { 'invLong': true};
    }
    return null;
  }
//remove the input from the FormArray
  removeRoute() {
    (<FormArray>this.pipelineFormControls['lat']).removeAt(this.index);
    (<FormArray>this.pipelineFormControls['long']).removeAt(this.index);
  }
//remove all inputs from the FormArray 
  removeFormArray()
  {
    (<FormArray>this.pipelineFormControls['lat']).clear();
    (<FormArray>this.pipelineFormControls['long']).clear();
  }
//delete last inputed route from the array of routes
  deleteRoute() {
    this.index -- ;
    this.errorMsg = false;
    this.removeRoute();


    let lat = (<FormArray>this.pipelineFormControls['lat']).value[this.index];
    let long = (<FormArray>this.pipelineFormControls['long']).value[this.index];

    let length = (<FormArray>this.pipelineFormControls['long']).length;
    //check if the element is the last element of the form Array
    if (this.index <= 0) {
      console.log('index', this.index)
      return;
    }
    //check if the element is the last element of the FormArray
    // if ((lat || long) && length <= -1) {
    //   console.log('length -1 ::', length)
    //   this.pipelineService.removeRoute();
    //   return;
    // }
    // //check if the index-2 exist within formArrayElements
    // if ((lat || long) && length >= 1) {
    //   this.pipelineService.removeRoute();
    //   return;
    // }
    if (lat || long) {
      console.log("last not empty", length)
      this.pipelineService.removeRoute();
      return;
    }
  
    if ((!lat || !long) && length > 0) {
      console.log('last empty lenth', length)
      this.pipelineService.removeRoute();
      return;
    } 
  }
//add the route in the FormArray
  addRouteForm() {
    const latControl = new FormControl(null, [Validators.required, this.latRange.bind(this)]);
      const longControl = new FormControl(null, [Validators.required, this.longRange.bind(this)]);

      (<FormArray>this.pipelineFormControls['lat']).push(latControl);
      (<FormArray>this.pipelineFormControls['long']).push(longControl);
      this.index += 1;
  }
  //add the inputed route from to FormArray to the array of routes after checks
  addCoordinate() {
    this.errorMsg = false;
    if (this.index === 0) {
      this.addRouteForm();
      return;
    }

    let lat = (<FormArray>this.pipelineFormControls['lat']).value[this.index-1];
    let lng = (<FormArray>this.pipelineFormControls['long']).value[this.index-1];

    //check whether inputed co-ordinate was not occupied using isUnique(data)
    //isUnique(data)
    if (this.pipelineService.isUnique({ lat: lat, lng: lng })) {
      
      // this.mapCoords.push({ lat: parseFloat(lat), lng: parseFloat(lng) });

      this.pipelineService.addRoute({ lat: lat, lng: lng });
      this.addRouteForm();
    }
    else {
      this.errorMsg = true;
    }
    
  }

  get displayPipelineTypeName() { 
    const pipelineType = this.pipelineType.find(item => item.id == this.pipelineFormControls['pipeline_type_id'].value);

    return pipelineType.name;
  }

  get showCompanyName() {
    let id = this.pipelineFormControls['company_id'].value;
    const company = this.companies.find(item => item.id == id);
    return company.name;
  }

  processForm() {
    let latLenght = (<FormArray>this.pipelineFormControls['lat']).length;
    let longLenght = (<FormArray>this.pipelineFormControls['long']).length;
    let lat = (<FormArray>this.pipelineFormControls['lat']).value[latLenght - 1];
    let long = (<FormArray>this.pipelineFormControls['long']).value[longLenght - 1];

    this.pipelineService.addRoute({ lat: lat, lng: long });
    let mapCoords = [];
    
    this.pipelineFormControls['lat'].value.forEach((currentValue, i) => {
      let lat = this.pipelineFormControls['lat'].value[i];
      let lng = this.pipelineFormControls['long'].value[i]

      mapCoords.push({lat: parseFloat(lat), lng: parseFloat(lng)})
    })

    this.pipelineService.pushPolyline({
      path: mapCoords,
      strokeColor: '#ffffff',
      strokeOpacity: 1.0,
      strokeWeight: 4.5,
    });

    this.polylineOptions = this.pipelineService.polylineOptions;

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

    setTimeout(() => this.showConfirmationForm(), 250);
  }

  processFormRequest() {
    Swal.close();
    Swal.showLoading();
    // Make Request to API
    let httpCall =
      this.operation === 'Update'
        ? this.pipelineEndpoint.update(this.id, this.formRequestData)
        : this.pipelineEndpoint.create(this.formRequestData);
    
    httpCall.subscribe({
      next: (response) => {
        if (this.operation === 'Update') {
          this.operation = 'Add';
          this.data = this.data.map(entry => {
            if (entry.id == this.id) {
              return response.data;
            }
            return entry;
          });
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
        this.removeFormArray();
      },
      error: (error) => {
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
    this.pipelineService.removePolyline();
  }

  closeMap() {
    this.displayMap = false;
  }

  newRecord() {
    this.displayMap = false;
    this.displaySectionForm = true;
    this.index = 0;
  }

  hideForm() {
    this.displaySectionForm = false;
    this.canShowConfirmationForm = false;
    this.pipelineForm?.reset();
    this.removeFormArray();
    this.index = 0;
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
    console.log(pData);

    this.id = event.row.data.id;
    this.pipelineName = event.row.data.name;

    let data = [];
    pData.pipeline_routes.forEach((currentValue: any) => {
      let lat = parseFloat(currentValue.lat);
      let lng = parseFloat(currentValue.long);

      data.push({lat: lat, lng: lng})

    });
    this.polyline ={
      path: data,
      strokeColor: pData.company.color,
      strokeOpacity: 1.0,
      strokeWeight: 3,
    }
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