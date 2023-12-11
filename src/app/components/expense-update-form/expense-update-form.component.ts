import { Component } from '@angular/core';
import { CategoryDTO } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ExpenseDTO } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/auth.service';
import { UserDTO } from 'src/app/models/user';

@Component({
  selector: 'app-update-form',
  templateUrl: './expense-update-form.component.html',
  styleUrls: ['./expense-update-form.component.css']
})
export class UpdateExpenseFormComponent {
  categories: CategoryDTO[] = [];
  categoryId: number;
  category: CategoryDTO;
  user: UserDTO;

  expense: ExpenseDTO;
  expenseForm: FormGroup;
  expenseUpdateId: number;
  updated: Subject<any> = new Subject();

  errorMessage: string;
  constructor(public bsModalRef: BsModalRef, private categoryService: CategoryService, private authService: AuthService, private expenseService: ExpenseService
  ) { }

  ngOnInit(): void {
    this.listCategories();

    this.getExpense(this.expenseUpdateId);

    this.expenseForm = new FormGroup({
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      currency: new FormControl('', Validators.required),
      category: new FormControl('', Validators.nullValidator),
      date: new FormControl('', Validators.required),
      user: new FormControl('', Validators.nullValidator),
    }, {});
  }

  getExpense(id: any | null): void {
    this.expenseService.getExpenseById(id)
      .subscribe({
        next: (expense: ExpenseDTO) => this.displayExpense(expense),
        error: err => this.errorMessage = err
      });
  }

  displayExpense(expense: ExpenseDTO): void {
    if (this.expenseForm) {
      this.expenseForm.reset();
    }
    this.expense = expense;

    console.log(this.expense.category?.categoryName)
    this.expenseForm.patchValue({
      description: this.expense.description,
      price: this.expense.price.toFixed(2),
      currency: this.expense.currency,
      category: this.expense.category?.id,
      date: this.expense.date,
      user: this.expense.user?.id
    });
  }

  listCategories() {
    this.categoryService.getCategories().subscribe(
      data => this.categories = data
    )
  }

  changeCategory(e: any) {
    this.categoryId = e.target.value;

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
    const updatedExpense = {
      description: this.expenseForm.get('description')?.value,
      price: this.expenseForm.get('price')?.value,
      currency: this.expenseForm.get('currency')?.value,
      category: this.category,
      date: this.expenseForm.get('date')?.value,
      user: this.user
    } as ExpenseDTO;

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

