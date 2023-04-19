import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NgSelectOption } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { RouterModule, Routes } from "@angular/router";
import { CategoryListComponent } from './components/category-list/category-list.component';
// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatIconModule} from '@angular/material/icon';
// import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {MatDialogModule} from '@angular/material/dialog';
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import {MatInputModule} from '@angular/material/input';
// import {MatSelectModule} from '@angular/material/select';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import {MatNativeDateModule} from '@angular/material/core';
// import { MatTableModule } from '@angular/material/table';  
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateFormComponent } from './components/update-form/update-form.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

const routers: Routes = [

  {path: 'Categories', component: CategoryListComponent},
  {path: 'Expenses', component: ExpenseListComponent},
  {path: '', redirectTo: 'Expenses', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ExpenseListComponent,
    CategoryListComponent,
    ExpenseFormComponent,
    UpdateFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    // MatToolbarModule,
    // MatIconModule,
    // MatButtonModule,
    // MatDialogModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatSelectModule,
    // MatDatepickerModule,
    // MatTableModule,
    // MatNativeDateModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routers),
    BrowserAnimationsModule,
   ModalModule.forRoot(),
   TooltipModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
