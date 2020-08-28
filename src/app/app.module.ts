import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectRequiredValidatorDirective } from './shared/select.required.validator.directive';
import { ConfirmEqualValidatorDirective } from './shared/confirm.equal.validator.directive';
import { EmployeeService } from './employees/employees.service';
import { DisplayEmployeeComponent } from './employees/display-employee.component';
import { CreateEmployeeCanDeactivateGuard } from './employees/create-employee-can-deactivate.guard.service';
import { EmployeeDetailsComponent } from './employees/employee-details.component';
import { EmployeeFilterPipe } from './employees/employees.filter.pipe';
import { EmployeeListResolverService } from './employees/employee-list-resolver.service';
import { NotFoundComponent } from './not-found.component';
import { EmployeeDetailsGuardService } from './employees/employee-details-guard.service';
import { AccordinComponent } from './shared/accordin/accordin.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    SelectRequiredValidatorDirective,
    ConfirmEqualValidatorDirective,
    DisplayEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeeFilterPipe,
    NotFoundComponent,
    AccordinComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [EmployeeService, CreateEmployeeCanDeactivateGuard, EmployeeDetailsGuardService, EmployeeListResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
