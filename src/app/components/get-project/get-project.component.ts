import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/api/register.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-project',
  templateUrl: './get-project.component.html',
  styleUrls: ['./get-project.component.scss']
})
export class GetProjectComponent implements OnInit {
  assignForm: FormGroup;
  currentPage;
  dataFromApi: any;
  submitted1 = false;
  loading = false;
  employeeName: any = [];
  projectId: any;
  constructor(
    private apiServices: RegisterService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
  ) {
    this.assignForm = this.formBuilder.group({
      assigned_to: [, Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get f1() { return this.assignForm.controls; }

  ngOnInit(): void {
    this.getProject();
    this.getEmployee();
  }

  getProject() {
    this.apiServices.getProject().subscribe((data: any) => {
      this.dataFromApi = data;
    });
  }

  assignFormSubmit() {
    this.submitted1 = true;
    // stop here if form is invalid
    if (this.assignForm.invalid) {
      this.assignForm.markAllAsTouched();
      return;
    }
    const requestParam = this.assignForm.value;
    this.apiServices.assignProject(requestParam, this.projectId).subscribe((data: any) => {
      Swal.fire({ icon: 'success', title: 'success', text: 'Prjocet Assign' });
      this.getProject();
    });
  }

  openModal(d, id) {
    this.projectId = id;
    this.modalService.open(d);
  }

  getEmployee() {
    this.apiServices.getEmployee().subscribe((data: any) => {
      data.map(res => {
        this.employeeName.push({ user: res.user.first_name + ' ' + res.user.last_name, id: res.id });
      });
    });
  }
}
