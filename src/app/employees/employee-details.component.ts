import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employees.service';
import { Employee } from '../model/employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  private id: number;
  employee: Employee;
  constructor(private route: ActivatedRoute,
              private employeeService: EmployeeService,
              private router: Router) { }

  ngOnInit() {
    //SnapShot Procedure
    // const id = +this.route.snapshot.paramMap.get('id');
    // this.employee = this.employeeService.getEmployee(id);

    //Subscribe Procedure
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id');
      // this.employee = this.employeeService.getEmployee(this.id);
      this.employeeService.getEmployee(this.id).subscribe(
        (employee: Employee) => { this.employee = employee; },
        (error: any) => { console.log('error'); }
      );
    });
  }

  viewNextEmployeeLists() {
    if (this.id < 3) {
      this.id = this.id + 1;
    } else {
      this.id = 1;
    }
    this.router.navigate(['employees', this.id]);
  }
}
