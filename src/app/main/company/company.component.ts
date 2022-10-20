import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyEndpoint } from 'app/api/endpoints/company.endpoint';
import { Company } from 'app/api/models/company.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  contentHeader: object;

  @BlockUI() blockUI: NgBlockUI;

  companyForm: FormGroup;
  displaySectionForm = false;
  formRequestData: Company;
  id?: number;

  canShowCompanyForm = true;
  canShowConfirmationForm = false;
  canSubmitcompanyForm = false;
  // hallTypes;
  companies: Company[] = [];

  data: Company[] = [];
  operation = 'Add';
  constructor(
    private fb: FormBuilder,
    private readonly companyEndpoint: CompanyEndpoint,

  ) {
    this.companyForm = this.fb.group({
      name: this.fb.control(null, [Validators.required]),
      address: this.fb.control(null, Validators.required),
      phone_number: this.fb.control(null, Validators.required),
      email: this.fb.control(null, Validators.required),
    });
    this.loadItem = this.loadItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Company',
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
            name: 'Company',
            isLink: false
          }
        ]
      }
    };

    this.blockUI.start("Loading...");

    this.companyEndpoint.list()
      .subscribe({
        next: (response) => {
          this.data = response.data;
          console.log(this.data)
          this.blockUI.stop();
        },
        error: (error) => this.blockUI.stop(),
      });
  }

  processForm() {
    console.log("Log")
    const formData: Company = {
      name: this.companyFormControls['name'].value,
      address: this.companyFormControls['address'].value,
      phone_number: this.companyFormControls['phone_number'].value,
      email: this.companyFormControls['email'].value,
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
        ? this.companyEndpoint.update(this.id, this.formRequestData)
        : this.companyEndpoint.create(this.formRequestData);
    // this.operation === "Update" ?
    // this.halltypeService.update(this.id, this.formRequestData) : this.halltypeService.create(this.formRequestData)
    httpCall.subscribe({
      next: (response) => {
        // this.router.navigate(['/module/probate/draft/detail', response.data.reg_no]);
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
    this.canShowCompanyForm = false;
    this.canShowConfirmationForm = true;
  }

  editForm() {
    this.canShowCompanyForm = true;
    this.canShowConfirmationForm = false;
    this.displaySectionForm = true;
  }


  newRecord() {
    this.displaySectionForm = true;
  }

  hideForm() {
    this.displaySectionForm = false;
    this.canShowConfirmationForm = false;
    this.companyForm?.reset();
  }

  get companyFormControls() {
    return this.companyForm.controls;
  }

  loadItem(event) {
    this.operation = "Update";
    this.newRecord();
    const companyData = this.data.find(
      item => item.id === event.row.data.id
    );

    this.id = event.row.data.id;

    this.companyForm.patchValue({
      name: companyData.name,
      address: companyData.address,
      phone_number: companyData.phone_number,
      email: companyData.email,
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
        this.companyEndpoint.delete(event.row.data.id).subscribe(
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
