import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoggerService } from '../../services/logger.service';
import { LogModel } from '../../models/log.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'dl-logger-form',
  templateUrl: './logger-form.component.html',
  styleUrls: ['./logger-form.component.scss'],
})
export class LoggerFormComponent implements OnInit, OnDestroy {
  log: LogModel;
  unsubscribe$ = new Subject<void>();

  constructor(private logService: LoggerService) {}

  ngOnInit() {
    this.logService.selectedLogItem
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: LogModel) => (this.log = data));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
