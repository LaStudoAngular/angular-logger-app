import { Component, OnInit } from '@angular/core';
import {LogModel} from '../../models/log.model';
import * as faker from 'faker';

@Component({
  selector: 'dl-logger-list',
  templateUrl: './logger-list.component.html',
  styleUrls: ['./logger-list.component.scss']
})
export class LoggerListComponent implements OnInit {
  logs: LogModel[];

  constructor() { }

  ngOnInit() {
    this.logs = [
      new LogModel(faker.random.uuid(), faker.lorem.sentence(), faker.date.recent()),
      new LogModel(faker.random.uuid(), faker.lorem.sentence(), faker.date.recent()),
      new LogModel(faker.random.uuid(), faker.lorem.sentence(), faker.date.recent()),
      new LogModel(faker.random.uuid(), faker.lorem.sentence(), faker.date.recent())
    ];
  }

}
