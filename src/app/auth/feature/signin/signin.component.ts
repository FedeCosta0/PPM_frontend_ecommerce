import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../data-access/auth.service";

@Component({
  selector: 'app-signin',
  standalone: true,
    imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  constructor(private authService: AuthService) {
  }

  signinForm: FormGroup = new FormGroup({
    'email': new FormControl(''),
    'password': new FormControl('')
  });

  ngOnInit(): void{
    this.signinForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    })
  }

  onSubmit(){
    console.log(this.signinForm);
    const email = this.signinForm.value.email;
    const password = this.signinForm.value.password;
    this.authService.signIn({
      email: email,
      password: password,
    }).subscribe(data => {console.log(data)})
    this.signinForm.reset();

  }

}
