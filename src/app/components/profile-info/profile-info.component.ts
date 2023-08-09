import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent {

  userForm: FormGroup;
  user: User;
  userUpdateId: number;
  errorMessage: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    
    this.getUser(this.userUpdateId);

    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required)
    }, {});
  }

  getUser(id: any | null): void {
    this.authService.getUserById(id)
      .subscribe({
          next: (user: User) => this.displayUser(user),
          error: err => this.errorMessage = err
      });
  }

  displayUser(user: User): void{
    if(this.userForm){
      this.userForm.reset();
    }
    this.user = user;

    this.userForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.emailAddress,
      date: this.user.birthDate
    });
  }

  onSubmit() {
    // console.log('in onSubmit: ', this.expenseForm.valid);
    // if (this.expenseForm.valid) {
    //   this.saveExpense();
    // } else {
    //   // show alert
    // }
  }

  logout(){
    this.authService.logout(true);
  }
}
