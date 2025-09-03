import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HelpButtonComponent } from './components/help-button/help-button.component';
import { TotalDisplayComponent } from './components/total-display/total-display.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HelpButtonComponent, TotalDisplayComponent],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('totem-app');
}
