import { Component } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { Expense } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Subject} from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent {
  categories: Category[] = [];
  categoryId:number;
  category:Category; 
  
  expense: Expense;
  expenseForm: FormGroup;
  expenseUpdateId:number;
  updated: Subject<any> = new Subject();
  
  errorMessage: string;
  constructor(public bsModalRef: BsModalRef, private categoryService: CategoryService, private expenseService: ExpenseService
    ) { }

    ngOnInit(): void {
      this.listCategories();
      
      console.log(this.expenseUpdateId)
      this.getExpense(this.expenseUpdateId);

      this.expenseForm = new FormGroup({
        description: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
        currency: new FormControl('', Validators.required),
        category: new FormControl('', Validators.nullValidator),
        date: new FormControl('', Validators.required)
      }, {});
    }

    getExpense(id: any | null): void {
      this.expenseService.getExpenseById(id)
        .subscribe({
            next: (expense: Expense) => this.displayExpense(expense),
            error: err => this.errorMessage = err
        });
    }
 
    displayExpense(expense: Expense): void{
      if(this.expenseForm){
        this.expenseForm.reset();
      }
      this.expense = expense;

      console.log(this.expense.category?.categoryName)
      this.expenseForm.patchValue({
        description: this.expense.description,
        price: this.expense.price,
        currency: this.expense.currency,
        category: this.expense.category?.id,
        date: this.expense.date
      });
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
      // show alert
    }
  }

  saveExpense() {
    const updatedExpense = {
      description: this.expenseForm.get('description')?.value,
      price: this.expenseForm.get('price')?.value,
      currency: this.expenseForm.get('currency')?.value,
      category: this.category,
      date: this.expenseForm.get('date')?.value,
    } as Expense;

    this.expenseService.updateExpense(this.expenseUpdateId, updatedExpense).subscribe({
      next: data => {
        console.log(data);
        this.updated.next({});
        this.bsModalRef.hide();
      },
      error: error => console.log(error)
    });
  }
}

