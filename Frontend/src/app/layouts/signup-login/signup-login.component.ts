import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup-login',
  templateUrl: './signup-login.component.html',
  styleUrls: ['./signup-login.component.css'],
})
export class SignupLoginComponent implements OnInit {
  routemsg!: String;

  result: any = {};

  loginForm!: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.routemsg = this.router.url.replace('/', '');
    console.log(this.routemsg);

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  getData() {
    console.log(this.loginForm.value);
    this.userService.loginUser(this.loginForm.value).subscribe((data) => {
      this.result = data;
      let id = this.result.id;
      localStorage.setItem('UserId', id);
      alert('Login successfull');
    });

    this.loginForm.reset();
  }
}
