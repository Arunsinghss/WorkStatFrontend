import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/api/register.service';
import { ShareService } from 'src/app/services/share/share.service';
import Swal from 'sweetalert2';
import * as CryptoTS from 'crypto-ts';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userdetails: any;
  currentPage;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: RegisterService,
    private shareService: ShareService
  ) {

  }

  ngOnInit(): void {
    this.userdetails = this.shareService.getEmpDetails();
    console.log(this.userdetails);
  }

}
