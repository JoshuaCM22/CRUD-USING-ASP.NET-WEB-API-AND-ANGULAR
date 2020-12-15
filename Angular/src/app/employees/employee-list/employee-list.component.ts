import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { ToastrService } from 'ngx-toastr';
import { EventEmitterService } from 'src/app/event-emitter.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  constructor(
    public service: EmployeeService,
    public toastr: ToastrService,
    private eventEmitterService: EventEmitterService
  ) {}

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(emp: Employee) {
    this.service.formData = Object.assign({}, emp);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteEmployee(id).subscribe((res) => {
        this.service.refreshList();
        this.resetFormFunctionInEmployeeComponent();
        this.toastr.info('Successfully deleted', 'ATTENTION');
      });
    }
  }

  resetFormFunctionInEmployeeComponent() {
    this.eventEmitterService.onEventEmitterServiceFunction();
  }
}
