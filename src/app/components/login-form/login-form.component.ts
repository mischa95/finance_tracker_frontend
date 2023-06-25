import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user';
import { BsModalService } from 'ngx-bootstrap/modal';
import { RegisterFormComponent } from '../register-form/register-form.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  user:User = new User();

  constructor(private loginService: LoginService, private router: Router, private modalService: BsModalService) {
  }

  login() {
    this.loginService.loginUser(this.user).subscribe(data=>{
      this.router.navigateByUrl('/Expenses');
    }, error=>alert("Invalid login data"));

  }

  openRegisterFormModal() {
    console.log('open create modal');
    const modalRef = this.modalService.show(RegisterFormComponent, {
      class: 'modal-md',
      animated: false
    });
  }
}
