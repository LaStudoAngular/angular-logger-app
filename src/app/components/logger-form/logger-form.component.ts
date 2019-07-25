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
  form: FormGroup;
  unsubscribe$ = new Subject<void>();

  constructor(private logService: LoggerService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null],
    });

    this.logService.selectedLogItem
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: LogModel) => {
        this.form.patchValue({
          name: data.text,
        });
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit() {
    console.log(this.form.get('name').value);
  }
}
