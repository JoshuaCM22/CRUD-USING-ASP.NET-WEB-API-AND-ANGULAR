import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root',
})
export class EventEmitterService {
  invokeResetFormFunctionInEmployeeComponent = new EventEmitter();
  subsVar: Subscription;
  constructor() {}
  onEventEmitterServiceFunction() {
    this.invokeResetFormFunctionInEmployeeComponent.emit();
  }
}
