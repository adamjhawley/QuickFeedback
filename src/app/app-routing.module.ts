import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignInComponent } from './sign-in/sign-in.component'
import { SubmitFeebackComponent } from './submit-feeback/submit-feeback.component';

import { hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/compat/auth-guard';
import { SignUpComponent } from './sign-in/sign-up/sign-up.component';

const adminOnly = () => hasCustomClaim('admin');
const redirectUnauthorizedToSignIn = () => redirectUnauthorizedTo(['sign-in']);
const redirectLoggedInToDash = () => redirectLoggedInTo(['dashboard']);
// const belongsToAccount = (next) => hasCustomClaim(`account-${next.params.id}`);

const routes: Routes = [
  { path: 'submit', component: SubmitFeebackComponent },
  { path: 'sign-in', component: SignInComponent, ...canActivate(redirectLoggedInToDash) },
  { path: 'sign-up', component: SignUpComponent, ...canActivate(redirectLoggedInToDash) },
  { path: 'dashboard', component: DashboardComponent, ...canActivate(redirectUnauthorizedToSignIn) },
  { path: '**', component: DashboardComponent, ...canActivate(redirectUnauthorizedToSignIn) },
];

@NgModule({
  declarations: [],
  imports: [ CommonModule, RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
