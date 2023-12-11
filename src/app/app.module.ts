import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateExpenseFormComponent } from './components/expense-create-form/expense-create-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateExpenseFormComponent } from './components/expense-update-form/expense-update-form.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HttpUrlInterceptor } from './interceptors/http-url.interceptor';
import { BasicAuthInterceptor } from './interceptors/basic-auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SidebarModule } from 'ng-cdbangular';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { PolarAreaChartComponent } from './components/polar-area-chart/polar-area-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

const routers: Routes = [
  { path: 'categories', component: CategoryListComponent },
  { path: 'expenses', component: ExpenseListComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'profile', component: ProfileInfoComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ExpenseListComponent,
    CategoryListComponent,
    CreateExpenseFormComponent,
    UpdateExpenseFormComponent,
    LoginFormComponent,
    RegisterFormComponent,
    StatisticsComponent,
    PolarAreaChartComponent,
    ProfileInfoComponent,
    NavBarComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SidebarModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routers),
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    NgxSpinnerModule,
    NgChartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpUrlInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
