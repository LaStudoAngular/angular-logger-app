import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoggerHeaderComponent } from './components/logger-header/logger-header.component';
import { LoggerFormComponent } from './components/logger-form/logger-form.component';
import { LoggerListComponent } from './components/logger-list/logger-list.component';

@NgModule({
  declarations: [AppComponent, LoggerHeaderComponent, LoggerFormComponent, LoggerListComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
