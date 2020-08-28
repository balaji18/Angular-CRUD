import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import { CreateEmployeeCanDeactivateGuard } from './employees/create-employee-can-deactivate.guard.service';
import { EmployeeDetailsComponent } from './employees/employee-details.component';
import { EmployeeListResolverService } from './employees/employee-list-resolver.service';
import { NotFoundComponent } from './not-found.component';
import { EmployeeDetailsGuardService } from './employees/employee-details-guard.service';


const routes: Routes = [
  { path: 'list',
    component: ListEmployeesComponent,
    resolve: {employeeList: EmployeeListResolverService}
  },
  {path: 'employees/:id',
   component: EmployeeDetailsComponent,
   canActivate : [EmployeeDetailsGuardService],
  },
  {path: 'edit/:id',
  component: CreateEmployeeComponent,
  canDeactivate: [CreateEmployeeCanDeactivateGuard]},
  {path: '', redirectTo: '/list', pathMatch: 'full'},
  {path: 'notfound', component: NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
