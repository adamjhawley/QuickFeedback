import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() loggedIn: boolean = false;
  constructor(private auth: AuthService, private router: Router) { }

  signOut () {
    this.auth.logout().then(() => this.router.navigate(['/sign-in']))
  }

  ngOnInit(): void {
  }

}
