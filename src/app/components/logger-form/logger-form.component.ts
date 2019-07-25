import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoggerService } from '../../services/logger.service';
import { LogModel } from '../../models/log.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'dl-logger-form',
  templateUrl: './logger-form.component.html',
  styleUrls: ['./logger-form.component.scss'],
})
export class LoggerFormComponent implements OnInit, OnDestroy {
  log: LogModel;
  form: FormGroup;
  unsubscribe$ = new Subject<void>();
  status = true;

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
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit() {
    this.logService.updateLogItem(this.form.get('name').value, this.log.id, this.status);
    this.onClear();
  }

  onClear(): void {
    this.form.reset();
    this.status = true;
  }
}
