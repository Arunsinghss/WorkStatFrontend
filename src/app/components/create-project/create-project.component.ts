import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  dataFromApiEmployee: any;
  projectId: string;
  editable = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiServices: RegisterService,
    private route: ActivatedRoute,
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
    this.projectId = this.route.snapshot.paramMap.get('id');
    if (this.projectId) {
      this.editable = true;
      this.getProjectbyId();
    }
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

  getProjectbyId() {
    this.apiServices.getProjectbyId(this.projectId).subscribe((res: any) => {
      this.projectForm.get('name').setValue(res.name);
      this.projectForm.get('description').setValue(res.description);
      this.projectForm.get('start_date').setValue(new Date(res.start_date));
      this.projectForm.get('end_date').setValue(res.end_date);
      console.log(res);
    });
  }
}
