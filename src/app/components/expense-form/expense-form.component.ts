import { Component, InjectionToken, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { Expense } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { Observable, Subject, first } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent implements OnInit {

  constructor(private categoryService: CategoryService, private expenseService: ExpenseService,
    private bsModalRef: BsModalRef) { }

  categories: Category[] = [];
  expense: Expense = new Expense();
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
    console.log('modal open');
  }


  listCategories() {
    this.categoryService.getCategories().subscribe(
      data => this.categories = data
    )
  }

  // onSubmit(){
  //   console.log(this.expenseForm.value);
  //   this.saveExpense();
  // }

  onSubmit() {
    console.log('in onSubmit: ', this.expenseForm.valid);
    if (this.expenseForm.valid) {
      this.saveExpense();
    }
  }

  saveExpense() {
    this.expenseService.addExpense(this.expense).subscribe({
      next: data => {
        console.log(data);
        this.expenseCreated.next({});
        this.bsModalRef.hide();
      },
      error: error => console.log(error)
    });
  }

}