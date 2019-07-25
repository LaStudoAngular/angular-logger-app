import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoggerService } from '../../services/logger.service';
import { LogModel } from '../../models/log.model';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'dl-logger-form',
  templateUrl: './logger-form.component.html',
  styleUrls: ['./logger-form.component.scss'],
})
export class LoggerFormComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new ReplaySubject<void>(1);
  log: LogModel;
  form: FormGroup;
  status = true;
  buttonText = 'add';

  constructor(private logService: LoggerService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null],
    });

    this.logService.selectedLogItem
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: LogModel) => {
        if (data.id !== null) {
          this.log = data;
          this.form.patchValue({
            name: data.text,
          });
          this.status = false;
          this.buttonText = 'edit';
        }
      });
  }

  onSubmit() {
    this.logService.updateLogItem(
      this.form.get('name').value,
      this.status,
      this.log != null ? this.log.id : undefined,
    );
    this.onClear();
  }

  onClear(): void {
    this.form.reset();
    this.status = true;
    this.buttonText = 'add';
    this.logService.updateState();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
