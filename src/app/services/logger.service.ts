import { Injectable } from '@angular/core';
import * as faker from 'faker';
import * as moment from 'moment';
import { LogModel } from '../models/log.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  getAllLogs(): Observable<LogModel[]> {
    const logs: LogModel[] = [
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
    return of<LogModel[]>(logs);
  }
}
