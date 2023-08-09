import { Component, OnInit } from '@angular/core';
import { Expense } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense.service';
import { Router } from '@angular/router';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';
import { UpdateFormComponent } from '../update-form/update-form.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];
  expenseId:number

  constructor(private expenseService: ExpenseService, private authService: AuthService, private router: Router, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.listExpenses();
  }

  listExpenses() {
    this.expenseService.getExpensesForCurrentUser().subscribe(
      (data: any) => this.expenses = data
    )
  }

  deleteExpense(id: number) {
    this.expenseService.deleteExpenses(id).subscribe((data: any) => {
      console.log(data);
      this.listExpenses();
    })
  }

  openUpdateExpenseModal(expenseId: number) {
    console.log('open update modal');
    
    const modalRef = this.modalService.show(UpdateFormComponent,  {
      class: 'modal-md',
      animated: false,
      initialState: {
        expenseUpdateId: expenseId
      }

    });

    modalRef?.content?.updated.subscribe(() => {
      this.listExpenses();
      
    });
  }

  openCreateExpenseModal() {
    console.log('open create modal');
    const modalRef = this.modalService.show(ExpenseFormComponent, {
      class: 'modal-md',
      animated: false
    });

    modalRef?.content?.expenseCreated.subscribe(() => {
      this.listExpenses();
    });
  }

  logout(){
    this.authService.logout(true);
  }
}
