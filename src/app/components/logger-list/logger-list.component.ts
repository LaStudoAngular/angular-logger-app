import { Component, OnDestroy, OnInit } from '@angular/core';
import { LogModel } from '../../models/log.model';
import { LoggerService } from '../../services/logger.service';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'dl-logger-list',
  templateUrl: './logger-list.component.html',
  styleUrls: ['./logger-list.component.scss'],
})
export class LoggerListComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new ReplaySubject<void>(1);
  logs: LogModel[];
  checked = '';
  load = false;

  constructor(private logService: LoggerService) {}

  ngOnInit() {
    this.logService
      .getAllLogs()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: LogModel[]) => (this.logs = data));
    this.logService.stateClear
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => (this.checked = ''));
    this.load = true;
  }

  onSelect(log: LogModel): void {
    this.logService.setLog(log);
    this.checked = log.id;
  }

  onDelete(log: LogModel): void {
    this.logService.deleteLogItem(log);
  }

  trackByFunction(item): string {
    return item ? item.id : undefined;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
