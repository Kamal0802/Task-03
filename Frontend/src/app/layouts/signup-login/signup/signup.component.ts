import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  result: any = {};
  constructor(private fb: FormBuilder, private userServ: UserService) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      phoneNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      pincode: ['', [Validators.required]],
    });
  }

  getData() {
    console.log(this.signupForm.value);

    this.userServ.signupUser(this.signupForm.value).subscribe((data) => {
      this.result = data;
      let id = this.result.id;
      localStorage.setItem('UserId', id);
      alert('Login successfull');
    });

    this.signupForm.reset();
  }
}
