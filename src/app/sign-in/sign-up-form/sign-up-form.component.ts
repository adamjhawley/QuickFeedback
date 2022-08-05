import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { MyErrorStateMatcher } from '../sign-in-form/sign-in-form.component';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email])
  password = new FormControl('', [Validators.required])

  matcher = new MyErrorStateMatcher()

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit () {
    if (this.email.value && this.password.value){
      this.authService.signUpWithEmail(this.email.value, this.password.value)
        .then(() => { this.router.navigate(['/dashboard']) })
    } else {
      throw Error("Can't login when missing required form entries.")
    }
  }

}