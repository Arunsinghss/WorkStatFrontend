import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { RegisterService } from 'src/app/services/api/register.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  designationForm: FormGroup;
  loading = false;
  submitted = false;
  designation: any;
  submitted1 = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: RegisterService,
    private modalService: NgbModal,
  ) {
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', Validators.required],
      emp_exp: ['', Validators.required],
      designation: ['', Validators.required],
      emp_age: ['', Validators.required],
    });

    this.designationForm = this.formBuilder.group({
      name: ['', Validators.required],
      designation: ['', Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  get f1() { return this.designationForm.controls; }

  ngOnInit(): void {
    this.getDesignation();
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const requestParam = this.registerForm.value;
    this.apiService.registerEmployee(requestParam).subscribe((data) => {
      if (data) {
        Swal.fire({ icon: 'success', text: 'Employee Created', title: 'Success' });
        this.router.navigateByUrl('/employee-list');
      }
    });
  }

  getDesignation() {
    this.apiService.getDesignation().subscribe(data => this.designation = data);
  }

  designationFormSubmit() {
    this.submitted1 = true;

    // stop here if form is invalid
    if (this.designationForm.invalid) {
      this.designationForm.markAllAsTouched();
      return;
    }
    const requestParam = this.designationForm.value;
    this.apiService.createDesignation(requestParam).subscribe((data: any) => {
      Swal.fire({ icon: 'success', text: 'Created', title: 'Created new designation' });
      this.getDesignation();
    });
  }

  openModal(d) {
    this.modalService.open(d);
  }
}
