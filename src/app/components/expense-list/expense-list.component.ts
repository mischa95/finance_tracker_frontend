import { Component, OnInit } from '@angular/core';
import { Expense } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense.service';
import { Router } from '@angular/router';
// import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog'
import { UpdateFormComponent } from '../update-form/update-form.component';
import { Observable } from 'rxjs';
import { Dialog } from '@angular/cdk/dialog';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';
import { BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];

  constructor(private expenseService: ExpenseService, private router: Router, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.listExpenses();
  }

  listExpenses() {
    this.expenseService.getExpenses().subscribe(
      (data: any) => this.expenses = data
    )
  }

  deleteExpense(id: number) {
    this.expenseService.deleteExpenses(id).subscribe((data: any) => {
      console.log(data);
      this.listExpenses();
    })
  }

  openUpdateExpenseModal() {
    // this.dialog.open(UpdateFormComponent, {
    //   width: "30%"
    // });
  }

  openCreateExpenseModal() {
    console.log('open create modal');
    const modalRef = this.modalService.show(ExpenseFormComponent, {
      class: 'modal-md'
      // initialState: {
      //   testSheetId: row.testSheetId
      // }

    });

    modalRef?.content?.expenseCreated.subscribe(() => {
      this.listExpenses();
    });
  }



  // sumAllExpenses() {
  //   this.expenseService.sumAllExpenses()
  // }


  updateExpense(id: number) {
    this.router.navigate(['update-expense', id]);
  }
}
