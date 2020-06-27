import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/api/register.service';

@Component({
  selector: 'app-get-project',
  templateUrl: './get-project.component.html',
  styleUrls: ['./get-project.component.scss']
})
export class GetProjectComponent implements OnInit {
  currentPage;
  dataFromApi: any;
  constructor(
    private apiServices: RegisterService
  ) { }

  ngOnInit(): void {
    this.getProject();
  }

  getProject() {
    this.apiServices.getProject().subscribe((data: any) => {
      this.dataFromApi = data;
    });
  }
}
