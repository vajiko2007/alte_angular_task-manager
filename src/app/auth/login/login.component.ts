import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginform = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  get email(){
    return this.loginform.controls["email"]
  }

  get password(){
    return this.loginform.controls["password"]
  }


  authService = inject(AuthService);
  router = inject(Router);

  login() {
    if (this.loginform.invalid) {
      return;
    }

    const { email, password } = this.loginform.value as {
      email: string;
      password: string;
    };

    this.authService.login(email, password)
      .subscribe({
        next: (res) => {
          console.log(res);
          const accessToken: string = res.token.accessToken;
          const refreshToken: string = res.token.refreshToken;
          const user = res.user;

          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('user', JSON.stringify(user));

          alert("You have successfully logged in to your account!");
          this.router.navigate(['projects']);
        },
      });
  }
}
