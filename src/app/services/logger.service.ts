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
  public selectedLogItem = this.logSource$.asObservable();

  public setLog(log: LogModel) {
    this.logSource$.next(log);
  }

  public updateLogItem(name: string, status: boolean, id?: string): void {
    if (status) {
      // add new log item
      this.logs.unshift(
        new LogModel(faker.random.uuid(), name, moment(new Date()).format('DD/MM/YYYY HH:MM:SS')),
      );
    } else {
      // update existing log item
      const idx: number = this.logs.findIndex((el: LogModel) => el.id === id);
      const item: LogModel[] = this.logs.splice(idx, 1);
      item[0].text = name;
      this.logs.unshift(item[0]);
    }
  }

  public deleteLogItem(log: LogModel): void {
    const idx: number = this.logs.findIndex((el: LogModel) => el.id === log.id);
    this.logs.splice(idx, 1);
  }

  public getAllLogs(): Observable<LogModel[]> {
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
