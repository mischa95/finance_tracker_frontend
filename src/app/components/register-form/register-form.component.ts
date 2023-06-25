import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {

  sexes: string[] = ["M", "F"];
  userForm: FormGroup;
  
  constructor(
    public bsModalRef: BsModalRef,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {

    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      emailAddress: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
      sex: new FormControl('', Validators.required)
    }, {});
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.saveUser();
    } else {
      // show alert
    }
  }

  saveUser() {
    const newUser = {
      username: this.userForm.get('username')?.value,
      password: this.userForm.get('password')?.value,
      emailAddress: this.userForm.get('emailAddress')?.value,
      firstName: this.userForm.get('firstName')?.value,
      lastName: this.userForm.get('lastName')?.value,
      birthDate: this.userForm.get('birthDate')?.value,
      sex: this.userForm.get('sex')?.value,
    } as User;

    this.loginService.addUser(newUser).subscribe({
      next: data => {
        console.log(data);
        this.bsModalRef.hide();
      },
      error: error => console.log(error)
    });
  }

}
