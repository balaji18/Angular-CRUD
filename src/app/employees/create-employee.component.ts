import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../model/department.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Employee } from '../model/employee.model';
import { EmployeeService } from './employees.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeDetailsComponent } from './employee-details.component';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  @ViewChild('employeeForm', { static: false }) public createEmployeeForm: NgForm;
  previewPhoto = false;
  datePickerConfig: Partial<BsDatepickerConfig>;
  employee: Employee;
  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' },
    { id: 5, name: 'Admin' }

  ];
  gender = 'male';
  panelTitle: string;
  constructor(private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false,
        minDate: new Date(2020, 0, 1),
        maxDate: new Date(2020, 11, 31),
        dateInputFormat: 'DD/MM/YYYY'
      });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      const id = +param.get('id');
      this.fetchEmployeeDetails(id);
    });


  }

  saveEmployee(): void {
    // const newEmployee: Employee = Object.assign({}, this.employee);
    // this.employeeService.saveEmployee(newEmployee);
    // this.createEmployeeForm.reset();
    // this.router.navigate(['list']);

    if (this.employee.id === null) {
      this.employeeService.addEmployee(this.employee).subscribe(
        (data: Employee) => {
          console.log('employee:', data);
          this.createEmployeeForm.reset();
          this.router.navigate(['list']);
        },
        (error: any) => {
          console.log('error:', error);
        }
      );
    } else {
      this.employeeService.updateEmployee(this.employee).subscribe(
        (data) => {
          console.log('employee:', data);
          this.createEmployeeForm.reset();
          this.router.navigate(['list']);
        },
        (error: any) => {
          console.log('error:', error);
        }
      );
    }

    
  }

  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }

  fetchEmployeeDetails(id) {
    if (id === 0) {
      this.employee = {
        id: null,
        name: null,
        gender: null,
        email: '',
        phoneNumber: null,
        contactPreference: null,
        dateOfBirth: null,
        department: 'select',
        isActive: null,
        photoPath: null
      };
      this.panelTitle = 'Create Employee';
      this.createEmployeeForm.reset();
    } else {
      this.panelTitle = 'Edit Employee';
      // this.employee = Object.assign({}, this.employeeService.getEmployee(id));
      this.employeeService.getEmployee(id).subscribe(
        (employee: Employee) => { this.employee = employee; },
        (error: any) => { console.log('error'); }
      );
    }
  }

}
