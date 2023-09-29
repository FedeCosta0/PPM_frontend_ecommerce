import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../data-access/auth.service";
import {Router} from "@angular/router";
import {CartService} from "../../../cart/data-access/cart.service";

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  signinForm: FormGroup = new FormGroup({
    'email': new FormControl(''),
    'password': new FormControl('')
  });

  constructor(private authService: AuthService, private router: Router, private cartService: CartService) {
  }

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    const email = this.signinForm.value.email;
    const password = this.signinForm.value.password;
    this.authService.signIn({
      email: email,
      password: password,
    }).subscribe((data: any) => {

      let _data = data['data']
      console.log(_data)
      this.authService.createUser(_data.user.id, _data.user.email, _data.user.first_name, _data.user.last_name, _data.token, _data.expiry, _data.user.is_admin)
      localStorage.setItem('user', JSON.stringify(this.authService.user))
      this.signinForm.reset();
      this.cartService.getCart();
      this.router.navigateByUrl('/');

    })


  }

}
