import { Component, OnInit } from '@angular/core';
import { LogModel } from '../../models/log.model';
import * as faker from 'faker';
import * as moment from 'moment';

@Component({
  selector: 'dl-logger-list',
  templateUrl: './logger-list.component.html',
  styleUrls: ['./logger-list.component.scss'],
})
export class LoggerListComponent implements OnInit {
  logs: LogModel[];

  constructor() {}

  ngOnInit() {
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
    ];
  }

  trackByFunction(item): string {
    return item ? item.id : undefined;
  }
}
