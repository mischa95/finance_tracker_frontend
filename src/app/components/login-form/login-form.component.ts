import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  user: User = new User();
  form: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    }, {});
  }

  login() {
    if (this.form.valid) {
      this.authService.login(this.form.get('username')?.value, this.form.get('password')?.value)
        .subscribe(val => {
          console.log(val);
          // hide spinner
          this.router.navigateByUrl('/Expenses');
        })
    } else {
      alert('Invalid form!');
    }
  }
}
