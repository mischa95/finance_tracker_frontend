import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserDTO } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {

  sexes: string[] = ['M', 'F'];
  userForm: FormGroup;
  modalRef: BsModalRef;

  constructor(
    public bsModalRef: BsModalRef,
    private authService: AuthService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {

    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
      sex: new FormControl('', Validators.required)
    }, {});
  }

  onSubmit() {
      this.saveUser();
  }

  saveUser() {
    const newUser = {
      username: this.userForm.get('username')?.value,
      password: this.userForm.get('password')?.value,
      email: this.userForm.get('email')?.value,
      firstName: this.userForm.get('firstName')?.value,
      lastName: this.userForm.get('lastName')?.value,
      birthDate: this.userForm.get('birthDate')?.value,
      sex: this.userForm.get('sex')?.value,
    } as UserDTO;

    this.authService.addUser(newUser).subscribe({
      next: data => {
        console.log(data);
        
        this.bsModalRef.hide();
      },
      error: error => console.log(error)
    });
  }

}