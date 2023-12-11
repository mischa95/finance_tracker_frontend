import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  user: UserDTO = new UserDTO();
  form: FormGroup;
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    }, {});
  }

  login() {
    if (this.form.valid) {
      this.spinner.show();
      this.authService.login(this.form.get('username')?.value, this.form.get('password')?.value)
        .subscribe(val => {
          console.log(val);
          this.spinner.hide();
          this.router.navigateByUrl('/expenses');
        })
    } else {
      alert('Invalid form!');
    }
  }

  openRegisterFormModal() {
    console.log('open create modal');
    const modalRef = this.modalService.show(RegisterFormComponent, {
      class: 'modal-md',
      animated: false
    });
  }
}
