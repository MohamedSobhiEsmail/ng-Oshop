import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
appUser:AppUser;
  constructor(private auth:AuthService,private router:Router) {
this.auth.appUser$.subscribe(appUser=>{this.appUser=appUser});
  }
  ngOnInit() {
  }
  logout(){
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
