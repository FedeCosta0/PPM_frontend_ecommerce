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

      data = data['data']

      this.authService.createUser(data.user.id, data.user.email, data.user.first_name, data.user.last_name, data.token, data.expiry, data.user.is_admin)

      localStorage.setItem('user', JSON.stringify(this.authService.user))
      this.signinForm.reset();
      this.cartService.getCart();
      this.router.navigateByUrl('/');

    })


  }

}
