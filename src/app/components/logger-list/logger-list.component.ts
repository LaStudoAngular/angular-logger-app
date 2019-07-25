import { Component, OnDestroy, OnInit } from '@angular/core';
import { LogModel } from '../../models/log.model';
import { LoggerService } from '../../services/logger.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'dl-logger-list',
  templateUrl: './logger-list.component.html',
  styleUrls: ['./logger-list.component.scss'],
})
export class LoggerListComponent implements OnInit, OnDestroy {
  logs: LogModel[];
  unsubscribe$ = new Subject();

  constructor(private logService: LoggerService) {}

  ngOnInit() {
    this.logService
      .getAllLogs()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: LogModel[]) => (this.logs = data));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  trackByFunction(item): string {
    return item ? item.id : undefined;
  }
}
