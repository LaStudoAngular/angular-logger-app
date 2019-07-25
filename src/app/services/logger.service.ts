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
  selectedLogItem = this.logSource$.asObservable();

  setLog(log: LogModel) {
    this.logSource$.next(log);
  }

  addLogItem(name: string, id: string, status: boolean): void {
    if (status) {
      this.logs.push(
        new LogModel(faker.random.uuid(), name, moment(new Date()).format('DD/MM/YYYY HH:MM:SS')),
      );
    } else {
      const editLog: LogModel = this.logs.find((el: LogModel) => el.id === id);
      editLog.text = name;
    }
  }

  deleteLogItem(log: LogModel): void {
    this.logs = this.logs.filter((item: LogModel) => item.id === log.id);
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
