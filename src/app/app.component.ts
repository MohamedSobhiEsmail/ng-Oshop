import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  lang="ar";
constructor(private auth:AuthService,private route:Router,private userservice:UserService,private translate: TranslateService)
{
  translate.setDefaultLang('en');
  this.auth.user$.subscribe(user=>{
    if(user){
      userservice.save(user);
    let returnUrl= localStorage.getItem('returnUrl');
   // console.log(returnUrl);
    this.route.navigateByUrl(returnUrl);
    }
  })
}
switchLanguage() {
  this.translate.use(this.lang);
  if(this.lang =="ar"){
    this.lang="en";
  }
  else{
    this.lang="ar"
  }
}
}
