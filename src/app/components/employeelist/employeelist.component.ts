import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/api/register.service';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.scss']
})
export class EmployeelistComponent implements OnInit {
  currentPage;
  dataFromApi: any;
  constructor(
    private apiServices: RegisterService
  ) { }

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee() {
    this.apiServices.getEmployee().subscribe((data: any) => {
      this.dataFromApi = data;
    });
  }

}
