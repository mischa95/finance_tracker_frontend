import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  user:User = new User();

  constructor(private loginService: LoginService, private router: Router) {
  }

  login() {
    this.loginService.loginUser(this.user).subscribe(data=>{
      alert("Successfully loged in");
      this.router.navigateByUrl('/Expenses');
    }, error=>alert("Invalid login data"));

  }
}
