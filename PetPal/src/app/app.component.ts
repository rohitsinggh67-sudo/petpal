import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone'; // <-- This is the correct import

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonApp, // <-- This is required for <ion-app>
    IonRouterOutlet, // <-- This is required for <ion-router-outlet>
  ],
})
export class AppComponent {
  constructor() {}
}