import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/api/register.service';
import { ShareService } from 'src/app/services/share/share.service';
import Swal from 'sweetalert2';
import * as CryptoTS from 'crypto-ts';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private SECRET_KEY = '786Qwe1Poi0aSd2lKj8zxD3mnB5786';
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: RegisterService,
    private shareService: ShareService
    // private alertService: AlertService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    const requestParam = this.loginForm.value;
    this.apiService.login(requestParam).subscribe((data: any) => {
      console.log(data.data.token);
      this.shareService.store_user_info(data.data);
      const tokenEncryptedString = CryptoTS.AES.encrypt(JSON.stringify(data.data.token), this.SECRET_KEY);
      localStorage.setItem('token', tokenEncryptedString.toString());
      Swal.fire({ icon: 'success', text: 'Success', title: 'You are Succesfull log in' });
    });
  }
}
