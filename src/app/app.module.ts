import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { RouterModule, Routes } from "@angular/router";
import { CategoryListComponent } from './components/category-list/category-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateFormComponent } from './components/update-form/update-form.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

const routers: Routes = [
  { path: 'Categories', component: CategoryListComponent },
  { path: 'Expenses', component: ExpenseListComponent },
  { path: 'Login', component: LoginFormComponent },
  { path: '', redirectTo: 'Login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ExpenseListComponent,
    CategoryListComponent,
    ExpenseFormComponent,
    UpdateFormComponent,
    LoginFormComponent,
    RegisterFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routers),
    BrowserAnimationsModule,
    ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
