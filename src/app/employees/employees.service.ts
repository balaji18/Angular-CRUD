import { Injectable } from '@angular/core';
import { Employee } from '../model/employee.model';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/delay';


@Injectable()
export class EmployeeService {

    constructor(private httpClient: HttpClient) {}
    // private listEmployees: Employee[] = [{
    //     id: 1,
    //     name : 'Angular',
    //     gender: 'Male',
    //     contactPreference: 'Email',
    //     email: 'angular@gmail.com',
    //     dateOfBirth : new Date('10/25/1991'),
    //     department: '3',
    //     isActive: true,
    //     phoneNumber: 1234567890,
    //     photoPath: 'assets/images/angular.png'
    //   },
    //   {
    //     id: 2,
    //     name : 'Typescript',
    //     gender: 'Female',
    //     contactPreference: 'Email',
    //     email: 'typescript@gmail.com',
    //     dateOfBirth : new Date('10/25/1991'),
    //     department: '1',
    //     isActive: true,
    //     phoneNumber: 1234567891,
    //     photoPath: 'assets/images/typescript.png'
    //   },
    //   {
    //     id: 3,
    //     name : 'Javascript',
    //     gender: 'Male',
    //     contactPreference: 'Email',
    //     email: 'javascript@gmail.com',
    //     dateOfBirth : new Date('10/25/1991'),
    //     department: '4',
    //     isActive: true,
    //     phoneNumber: 1234567892,
    //     photoPath: 'assets/images/javascript.png'
    //   }
    // ];
    baseUrl = 'http://localhost:3000/employees';
    getEmployees(): Observable<Employee[]> {
        return this.httpClient.get<Employee[]>(this.baseUrl)
         .pipe(catchError(this.handleError));
       // return of(this.listEmployees).delay(2000);
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.log('Client Side Error:' , errorResponse.error.message);
        } else {
            console.log('Server Side Error:', errorResponse);
        }
        return throwError('There is a problem with the service, we are notified & working on it, Please try later');
    }

    // getEmployee(id: number) {
    //     return this.listEmployees.find(e => e.id === id);
    // }

    //  without json-server
    // saveEmployee(employee: Employee) {
    //     if (employee.id === null) {
    //         const maxId = this.listEmployees.reduce(function(e1, e2) {
    //             return (e1.id > e2.id) ? e1 : e2;
    //         }).id;
    //         employee.id = maxId + 1;
    //         this.listEmployees.push(employee);
    //     } else {
    //         const foundIndex = this.listEmployees.findIndex(e => e.id === employee.id);
    //         this.listEmployees[foundIndex] =  employee;
    //     }
    // }

    getEmployee(id: number): Observable<Employee> {
        return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
    }

    addEmployee(employee: Employee): Observable<Employee> {
        return this.httpClient.post<Employee>(this.baseUrl, employee, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError));
    }

    updateEmployee(employee: Employee): Observable<void> {
        return this.httpClient.put<void>(`${this.baseUrl}/${employee.id}`, employee, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError));
    }

    deleteEmployee(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
    }

    // deleteEmployee(id: number) {
    //     const index = this.listEmployees.findIndex(e => e.id === id);
    //     if (index !== -1) {
    //         this.listEmployees.splice(index, 1);
    //     }

    // }
}
