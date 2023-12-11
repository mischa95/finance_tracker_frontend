import { Component, OnInit } from '@angular/core';
import { CategoryDTO } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ExpenseDTO } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserDTO } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-create-form.component.html',
  styleUrls: ['./expense-create-form.component.css']
})
export class CreateExpenseFormComponent implements OnInit {

  constructor(
    private categoryService: CategoryService,
    private expenseService: ExpenseService,
    private authService: AuthService,
    public bsModalRef: BsModalRef
  ) { }

  categories: CategoryDTO[] = [];
  expenseForm: FormGroup;
  expenseCreated: Subject<any> = new Subject();

  categoryId:number;
  category:CategoryDTO; 
  user:UserDTO; 

  ngOnInit(): void {

    this.listCategories();

    this.expenseForm = new FormGroup({
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      currency: new FormControl('', Validators.required),
      category: new FormControl('', Validators.nullValidator),
      date: new FormControl('', Validators.required),
      user: new FormControl('', Validators.nullValidator)
    }, {});
  }


  listCategories() {
    this.categoryService.getCategories().subscribe(
      data => this.categories = data
    )
  }

  changeCategory(e:any){
    this.categoryId=e.target.value;

    this.categoryService.getCategoryById(this.categoryId).subscribe(
      (data: any) => this.category = data
    )
  }

  onSubmit() {
    console.log('in onSubmit: ', this.expenseForm.valid);
    if (this.expenseForm.valid) {
      this.saveExpense();
    } else {
      // TODO show alert
    }
  }

  saveExpense() {
    const newExpense = {
      description: this.expenseForm.get('description')?.value,
      price: this.expenseForm.get('price')?.value,
      currency: this.expenseForm.get('currency')?.value,
      category: this.category,
      date: this.expenseForm.get('date')?.value,
    } as ExpenseDTO;

    this.expenseService.addExpense(newExpense).subscribe({
      next: data => {
        console.log(data);
        this.expenseCreated.next({});
        this.bsModalRef.hide();
      },
      error: error => console.log(error)
    });
  }
}