import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
constructor(private auth:AuthService,private route:Router,private userservice:UserService)
{
  this.auth.user$.subscribe(user=>{
    if(user){
      userservice.save(user);
    let returnUrl= localStorage.getItem('returnUrl');
   // console.log(returnUrl);
    this.route.navigateByUrl(returnUrl);
    }
  })
}
}
