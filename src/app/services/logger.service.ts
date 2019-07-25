import { Injectable } from '@angular/core';
import * as faker from 'faker';
import * as moment from 'moment';
import { LogModel } from '../models/log.model';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private logs: LogModel[];
  private logSource$ = new BehaviorSubject<LogModel>(new LogModel(null, null, null));
  private stateSource$ = new BehaviorSubject(null);

  public selectedLogItem = this.logSource$.asObservable();
  public stateClear = this.stateSource$.asObservable();

  public setLog(log: LogModel) {
    this.logSource$.next(log);
  }

  public updateState() {
    this.stateSource$.next(null);
  }

  public updateLogItem(name: string, status: boolean, id?: string): void {
    if (status) {
      // ADD NEW LOG ITEM
      this.logs.unshift(
        new LogModel(faker.random.uuid(), name, moment(new Date()).format('DD/MM/YYYY HH:MM:SS')),
      );
    } else {
      // UPDATE EXISTING LOG ITEM
      // TODO: try to replace this crocodile by reduce method
      const idx: number = this.logs.findIndex((el: LogModel) => el.id === id);
      const item: LogModel[] = this.logs.splice(idx, 1);
      item[0].text = name;
      this.logs.unshift(item[0]);
    }
  }

  public deleteLogItem(log: LogModel): void {
    if (confirm('Are you sure to delete this log?')) {
      // TODO: try to replace this crocodile by reduce method
      const idx: number = this.logs.findIndex((el: LogModel) => el.id === log.id);
      this.logs.splice(idx, 1);
    }
  }

  public getAllLogs(): Observable<LogModel[]> {
    // TODO: use moment for output data only
    this.logs = [
      new LogModel(
        faker.random.uuid(),
        faker.lorem.words(5),
        moment(faker.date.recent()).format('DD/MM/YYYY HH:MM:SS'),
      ),
      new LogModel(
        faker.random.uuid(),
        faker.lorem.words(5),
        moment(faker.date.recent()).format('DD/MM/YYYY HH:MM:SS'),
      ),
      new LogModel(
        faker.random.uuid(),
        faker.lorem.words(5),
        moment(faker.date.recent()).format('DD/MM/YYYY HH:MM:SS'),
      ),
      new LogModel(
        faker.random.uuid(),
        faker.lorem.words(5),
        moment(faker.date.recent()).format('DD/MM/YYYY HH:MM:SS'),
      ),
      new LogModel(
        faker.random.uuid(),
        faker.lorem.words(5),
        moment(faker.date.recent()).format('DD/MM/YYYY HH:MM:SS'),
      ),
    ];
    return of<LogModel[]>(this.logs);
  }
}
