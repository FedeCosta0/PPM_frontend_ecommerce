import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "../../data-access/auth.service";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatInputModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  constructor(private authService: AuthService) {
  }

  signupForm: FormGroup = new FormGroup({
    'email': new FormControl(''),
    'password': new FormControl(''),
    'password2': new FormControl(''),
    'first_name': new FormControl(''),
    'last_name': new FormControl('')
  });

  ngOnInit(): void{
    this.signupForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
      'password2': new FormControl(null, Validators.required),
      'first_name': new FormControl(null, Validators.required),
      'last_name': new FormControl(null, Validators.required)
    })
  }

  onSubmit(){
    console.log(this.signupForm);
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    const password2 = this.signupForm.value.password2;
    const first_name = this.signupForm.value.first_name;
    const last_name = this.signupForm.value.last_name;
    this.authService.signUp({
      email: email,
      password: password,
      password2: password2,
      first_name: first_name,
      last_name: last_name
    }).subscribe(data => {console.log(data)})
    this.signupForm.reset();

  }
}
