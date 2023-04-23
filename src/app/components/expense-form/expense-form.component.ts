import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { Expense } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent implements OnInit {

  constructor(
    private categoryService: CategoryService,
    private expenseService: ExpenseService,
    public bsModalRef: BsModalRef
  ) { }

  categories: Category[] = [];
  expenseForm: FormGroup;
  expenseCreated: Subject<any> = new Subject();

  ngOnInit(): void {

    this.listCategories();

    this.expenseForm = new FormGroup({
      description: new FormControl('', Validators.required),
      // price: new FormControl('', Validators.required),
      // currency: new FormControl('', Validators.required),
      // category: new FormControl('', Validators.required),
      // date: new FormControl('', Validators.required),
    }, {});
  }


  listCategories() {
    this.categoryService.getCategories().subscribe(
      data => this.categories = data
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
    const newExpense = {
      description: this.expenseForm.get('description')?.value
    } as Expense;

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