import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { RegisterService } from 'src/app/services/api/register.service';
import Swal from 'sweetalert2';
import * as _moment from 'moment';
@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  projectForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiServices: RegisterService
  ) {
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      start_date: [new Date(), Validators.required],
      end_date: [new Date(), Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.projectForm.controls; }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }
    const requestParam = this.projectForm.value;
    requestParam.start_date = this.getDateformat(requestParam.start_date);
    requestParam.end_date = this.getDateformat(requestParam.end_date);
    this.apiServices.createNewProject(requestParam).subscribe((data: any) => {
      Swal.fire({ icon: 'success', text: 'Added Project', title: 'Success' });
    });
  }

  getDateformat(date) {
    return _moment(date).format('DD-MM-YYYY');
  }
}
