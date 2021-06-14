import { LoadingService } from './../shared/loading.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from '../shared/api.service';
import { LoginResponse } from '../shared/response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isAPI = false;
  constructor(private formBuilder: FormBuilder,
    private apiSerive: ApiService,
    private loadingService: LoadingService,
    private router: Router) { }
  public loginForm = this.formBuilder.group({
    userName: ['', Validators.required],
    passWord: ['', Validators.required]
  });
  private unsubscribe$ = new Subject<void>();
  ngOnInit() {
    this.isAPI = false;
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token')
      localStorage.clear();
    }
    this.subscribeLoginAPIState()
  }
  subscribeLoginAPIState() {
    this.loadingService.
      isLoading$.pipe(takeUntil(this.unsubscribe$)).
      subscribe((status: boolean) => {
        if (status) { this.isAPI = true }
        else {
          this.isAPI = false;
        }
      });
  }
  onSubmit() {
    this.apiSerive.login(this.loginForm.value.userName, this.loginForm.value.passWord).pipe(takeUntil(this.unsubscribe$))
      .subscribe((response: any) => {
        if (response.is_success) {
          if (response.data) {
            localStorage.setItem('token', response.data.token)
            this.router.navigate(['/movies'])
          }
        }
      }, (error: any) => {
        console.error(error)
      });
  }
  getErrorMessage(formControl, name) {
    console.log(formControl)
    let msg = name + " is required"
    return msg
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }
}
