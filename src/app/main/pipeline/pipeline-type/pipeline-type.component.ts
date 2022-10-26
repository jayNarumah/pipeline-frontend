import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PipelineTypeEndpoint } from 'app/api/endpoints/pipeline-type.endpoint';
import { PipelineType } from 'app/api/models/pipeline-type.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pipeline-type',
  templateUrl: './pipeline-type.component.html',
  styleUrls: ['./pipeline-type.component.scss']
})
export class PipelineTypeComponent implements OnInit {
data: PipelineType[] = [];
  pipelineTypeForm: FormGroup;
  formRequestData?: PipelineType;

  public contentHeader: object;

  @BlockUI() blockUI: NgBlockUI;

  operation = 'Add';

  displaySectionForm = false;
  id: number;
  pipelineType;

  constructor(
    private readonly pipelineTypeEndpoint: PipelineTypeEndpoint,
    private readonly fb: FormBuilder,
  ) {
    this.pipelineTypeForm = this.fb.group({
      name: this.fb.control(null, [Validators.required]),  
    });
    this.loadItem = this.loadItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Manage pipelineType',
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
            name: 'PipelineType',
            isLink: false
          }
        ]
      }
    };

    this.blockUI.start('Loading...');
    this.pipelineTypeEndpoint.list()
      .subscribe({
        next: (response) => {
          this.data = response.data;
          this.blockUI.stop();
        },
        error: (error) => {
          Swal.fire(
            "Error",
            error.message || error,
            'error'
          );
          this.blockUI.stop();
        },
      })
  }

  addItem() {
    this.displaySectionForm = true;
  }

  cancel() {
    this.reset();
    this.displaySectionForm = false;
  }

  reset() {
    this.pipelineTypeForm.reset();
  }

  get pipelineTypeFormControls() {
    return this.pipelineTypeForm.controls;
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
        this.pipelineTypeEndpoint.delete(event.row.data.id).subscribe(
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

  loadItem(event) {
    this.addItem();
    this.pipelineType = this.data.find(
      item => item.id === event.row.data.id
    );

    this.id = event.row.data.id;

    this.pipelineTypeForm.patchValue({
      name: this.pipelineType.name,
    });

    this.operation = "Update";
  }

  processForm() {
    // Validate before Preview

    if (!this.pipelineTypeForm.valid) {
      Swal.fire({
        icon: 'info',
        title: 'Information!',
        text: 'Please complete the required fields and try again.',
        customClass: {
          confirmButton: 'btn btn-info'
        }
      });
      return;
    }

    const formData: PipelineType = {
      name: this.pipelineTypeFormControls['name'].value,
    };
    this.formRequestData = formData;

    if (this.operation === 'Update') {
      this.pipelineTypeEndpoint.update(this.id, this.formRequestData)
        .subscribe({
          next: (response) => {
            Swal.hideLoading();
            this.data = this.data.map(item => {
              if (item.id == this.id) {
                return response.data;
              }
              else {
                return item;
              }
            })

            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Operation successful',
              customClass: {
                confirmButton: 'btn btn-success'
              }
            });;
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
    } else {


      // console.log(this.formRequestData);
      this.pipelineTypeEndpoint.create(this.formRequestData)
        .subscribe({
          next: (response) => {
            Swal.hideLoading();
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Operation successful',
              customClass: {
                confirmButton: 'btn btn-success'
              }
            });
            this.data.push(response.data);

          },
          error: (error) => {
            console.log("An error occurred while attempting to submit probate application...");
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

    this.reset();
    this.cancel();
    this.operation = 'Add'
  }
}
