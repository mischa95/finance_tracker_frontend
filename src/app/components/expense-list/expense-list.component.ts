import { Component, OnInit } from '@angular/core';
import { ExpenseDTO } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense.service';
import { CreateExpenseFormComponent } from '../expense-create-form/expense-create-form.component';
import { UpdateExpenseFormComponent } from '../expense-update-form/expense-update-form.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  expenses: ExpenseDTO[] = [];
  expenseId: number
  modalRef: BsModalRef;

  constructor(private expenseService: ExpenseService, private authService: AuthService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.listExpenses();
  }

  listExpenses() {
    this.expenseService.getExpensesForCurrentUser().subscribe(
      (data: any) => this.expenses = data
    )
  }

  deleteExpense(id: number) {
    
    this.modalRef = this.modalService.show(ConfirmationDialogComponent, {
      initialState: {
        title: 'Delete',
        text: 'Are you sure you want to delete this expense?'
      },
      class: 'modal-md',
      animated: false
    });
    
    this.modalRef.content.onclose.subscribe((result: any) => {

      if(result){
        this.expenseService.deleteExpenses(id).subscribe((data: any) => {
          console.log(data);
          this.listExpenses();
        })
      }
  })
  }

  openUpdateExpenseModal(expenseId: number) {
    const modalRef = this.modalService.show(UpdateExpenseFormComponent, {
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
    const modalRef = this.modalService.show(CreateExpenseFormComponent, {
      class: 'modal-md',
      animated: false
    });
    modalRef?.content?.expenseCreated.subscribe(() => {
      this.listExpenses();
    });
  }
}
