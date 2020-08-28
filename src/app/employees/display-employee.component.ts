import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../model/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employees.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {

  @Input() employee: Employee;
  @Input() searchTermm: string;
  @Output() notify: EventEmitter<Employee> = new EventEmitter<Employee>();
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  confirmDelete = false;
  private selectedViewList: number;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService) { }

  ngOnInit() {
    this.selectedViewList = +this.route.snapshot.paramMap.get('id');
  }

  handleClick() {
    this.notify.emit(this.employee);
  }

  viewEmployee() {
    this.router.navigate(['/employees', this.employee.id], {
      queryParams: { 'searchTerm': this.searchTermm }
    });
  }

  editEmployee() {
    this.router.navigate(['/edit', this.employee.id])
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.employee.id).subscribe(
      (data) => {
        console.log(`Employee with id = ${this.employee.id}  deleted`);
      },
      (error) => console.log(error)
    );
    this.notifyDelete.emit(this.employee.id);
  }
}

