import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerform = new FormGroup({
    firstName: new FormControl<string>('', Validators.required),
    lastName: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  authService = inject(AuthService);
  router = inject(Router);


  get firstName(){
    return this.registerform.controls["firstName"]
  }

  get lastName(){
    return this.registerform.controls["lastName"]
  }
  get email(){
    return this.registerform.controls["email"]
  }

  get password(){
    return this.registerform.controls["password"]
  }


  Signup() {
    if (this.registerform.invalid) {
      this.registerform.markAllAsTouched();
      return;
    }

    const user = {
      firstName: this.registerform.value.firstName,
      lastName: this.registerform.value.lastName,
      email: this.registerform.value.email,
      password: this.registerform.value.password
    };

    this.authService.signUp(user).subscribe({
      next: (res: any) => {
        console.log(res);
        alert("You have successfully registered");
        this.router.navigate(['/login']);
      },

    });
  }
}
