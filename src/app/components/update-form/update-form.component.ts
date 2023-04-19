import { Component, InjectionToken, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { Expense } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {FormControl, FormGroup, Validators, FormBuilder, NgForm} from '@angular/forms';
import { Location } from '@angular/common';
import { Observable, Subscription, first } from 'rxjs';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent {
  categories: Category[] = [];
  expense: Expense;
  formControl = new FormControl('', [Validators.required]);
  expenseForm: FormGroup;
  errorMessage: string;

  id: any |null
  private sub: Subscription;
  

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private _categoryService: CategoryService, private expenseService: ExpenseService,
    private router: Router) { }

    ngOnInit(): void {
      
      this.listCategories();
        this.expenseForm = this.formBuilder.group({
            description: ['', Validators.required],
            price: ['', Validators.required],
            currency: ['', Validators.required],
            category: ['', [Validators.required]],
            date: ['', Validators.required]
        }, {});

        // this.sub = this.route.paramMap.subscribe(
        //   params => {
        //     const id = +params.get('id');
        //     this.getExpense(id);
        //   }
        // )

        // let expenseId= this.route.snapshot.paramMap.get('id');
        // console.warn(expenseId);
        // expenseId && this.getExpense(expenseId).subscribe((data) =>{
        //   console.warn(data)
        // })
        // this.route.paramMap.subscribe(params => {
        //   this.id= params.get('id');
        //   this.getExpense(this.id);
        // });
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

      this.expenseForm.patchValue({
        description: this.expense.description,
        price: this.expense.price,
        currency: this.expense.currency,
        category: this.expense.category.categoryName,
        date: this.expense.date
      });
      //this.expenseForm.setControl('tags', this.formBuilder.array(this.expense.id  || []));
    }

  listCategories() {
    this._categoryService.getCategories().subscribe(
      data => this.categories = data
    )
  }

  onSubmit(){
    console.log(this.expense);
    this.saveExpense();
    this.close();
  }

  // onSubmit(form: NgForm){
  //   console.log('in onSubmit: ', form.valid);
  //   this.saveExpense();
  //   this.close();
  // }

  saveExpense(){
    this.expenseService.updateExpense(this.id, this.expense).subscribe( data =>{
      console.log(data);
      this.goToExpenseList();
    },
    error => console.log(error));
  }

  goToExpenseList(){
    this.router.navigate(['/Expense']);
  }

  close() {
    //this.dialog.close();
    window.location.reload();
}
}
