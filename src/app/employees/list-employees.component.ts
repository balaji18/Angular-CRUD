import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ResolvedEmployeeList } from './resolved-employeelist.model';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[];
  filteredEmployees: Employee[];
  dataFromChild: Employee;
  private searchTerm: string;
  error : string;

  get searchTermm(): string {
    return this.searchTerm;
  }

  set searchTermm(value: string) {
    this.searchTerm = value;
    this.filteredEmployees = this.filterEmployees(value);
  }

  filterEmployees(searchString: string) {
    return this.employees.filter(employee => employee.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);

  }

  constructor(private router: Router, private route: ActivatedRoute) {
    const resolvedData: Employee[] | string = this.route.snapshot.data['employeeList'];
    if (Array.isArray(resolvedData)) {
       this.employees = resolvedData;
    } else {
      this.error = resolvedData;
    }
   // this.employees = this.route.snapshot.data['employeeList'];
    if (this.route.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTermm = this.route.snapshot.queryParamMap.get('searchTerm');
    } else {
      this.filteredEmployees = this.employees;
    }
  }

  ngOnInit() {

  }

  handleNotify(eventData: Employee) {
    this.dataFromChild = eventData;
  }

  // employeeDetail(employeeId: number) {
  //   this.router.navigate(['/employees', employeeId], {
  //     queryParams:{'searchTerm': this.searchTermm, 'testParam' : 'testValue'},
  //   });

  // }

  // changeEmployeeName() {
  //   this.employees[0].name = 'Apple';
  //   this.filteredEmployees = this.filterEmployees(this.searchTerm);
  // }


  onDeleteNotification(id: number) {
    const index = this.filteredEmployees.findIndex(e => e.id === id);
    if (index !== -1) {
      this.filteredEmployees.splice(index, 1);
    }
  }

}
