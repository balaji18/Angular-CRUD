import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { EmployeeService } from './employees.service';
import { Employee } from '../model/employee.model';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ResolvedEmployeeList } from './resolved-employeelist.model';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class EmployeeListResolverService implements Resolve<Employee[] | string> {
    constructor(private employeeService: EmployeeService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[] | string> {
        return this.employeeService.getEmployees().pipe(
            catchError((error: any) => of(error))
        );
    }
}
