import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EventEmitterService } from 'src/app/event-emitter.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  constructor(
    public service: EmployeeService,
    public toastr: ToastrService,
    private eventEmitterService: EventEmitterService
  ) {}

  ngOnInit() {
    this.resetForm();
    if (this.eventEmitterService.subsVar == undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.invokeResetFormFunctionInEmployeeComponent.subscribe(
        (name: string) => {
          this.resetForm();
        }
      );
    }
  }

  isClearButtonIsClicked: Boolean = false;

  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.service.formData = {
      ID: null,
      Full_Name: '',
      Position: '',
      Mobile_No: '',
    };
  }

  clearButtonIsClicked() {
    this.isClearButtonIsClicked = true;
  }

  onSubmit(form: NgForm) {
    if (this.isClearButtonIsClicked === true) {
      this.resetForm(form);
      this.service.refreshList();
      this.isClearButtonIsClicked = false;
    } else {
      if (form.value.ID == null) this.insertRecord(form);
      else this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.service.postEmployee(form.value).subscribe((res) => {
      this.toastr.info('Successfully inserted', 'ATTENTION');
      this.resetForm(form);
      this.service.refreshList();
    });
  }

  updateRecord(form: NgForm) {
    this.service.putEmployee(form.value).subscribe((res) => {
      this.toastr.info('Successfully updated', 'ATTENTION');
      this.resetForm(form);
      this.service.refreshList();
    });
  }
}
