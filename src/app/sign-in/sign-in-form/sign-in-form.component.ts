import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email])
  password = new FormControl('', [Validators.required])

  matcher = new MyErrorStateMatcher()

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit () {
    if (this.email.value && this.password.value){
      this.authService.signInWithEmail(this.email.value, this.password.value)
        .then(() => { this.router.navigate(['/dashboard']) })
        .catch(() => {
          this.password.reset()
          this.password.setErrors({authError: true})
        })
    }
  }

}
