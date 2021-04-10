import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}
  myGroup!: FormGroup;
  error: string | undefined;
  success: string | undefined;
  ngOnInit(): void {
    this.initFormStructure();
  }
  private initFormStructure(): void {
    this.myGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  onSubmit() {
    let creadentials = this.myGroup.getRawValue();
    this.userService.login(creadentials).subscribe({
      next: (result) => {
        // this.success = result.message;
        this.router.navigate(['/']);
        this.error = undefined;
      },
      error: (response: HttpErrorResponse) => {
        console.log(response);
        this.error = response.error;
        this.success = undefined;
      },
    });
  }
}
