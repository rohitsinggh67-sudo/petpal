// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterLink } from '@angular/router'; // <-- CRITICAL: Import RouterLink
// import {
//   // We import the specific Ionic components we use
//   IonContent,
//   IonButton,
// } from '@ionic/angular/standalone';
// import {
//   trigger,
//   style,
//   animate,
//   transition,
// } from '@angular/animations'; // For the animation

// @Component({
//   selector: 'app-welcome',
//   templateUrl: './welcome.page.html',
//   styleUrls: ['./welcome.page.scss'],
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     RouterLink, // <-- CRITICAL: Add RouterLink to the imports array
//     IonContent, // Add the Ionic components used in the HTML
//     IonButton,  // Add the Ionic components used in the HTML
//   ],
//   animations: [
//     trigger('fadeIn', [
//       transition(':enter', [
//         style({ opacity: 0, transform: 'translateY(20px)' }),
//         animate(
//           '800ms ease-out',
//           style({ opacity: 1, transform: 'translateY(0)' })
//         ),
//       ]),
//     ]),
//   ],
// })
// export class WelcomePage implements OnInit {
//   constructor() {}
//   ngOnInit() {}
// }




import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // <-- 1. Import Router for navigation
import {
  IonContent,
  IonButton,
  ActionSheetController, // <-- 2. Import ActionSheetController
} from '@ionic/angular/standalone';
import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations'; // For the animation

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonButton,
    // Note: We no longer import RouterLink here
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '800ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class WelcomePage implements OnInit {
  // 3. Inject the services we need in the constructor
  constructor(
    private actionSheetCtrl: ActionSheetController,
    private router: Router
  ) {}

  ngOnInit() {}

  // 4. This function is called by your (click) event in the HTML
 async presentActionSheet() {
  const actionSheet = await this.actionSheetCtrl.create({
    header: 'Welcome to PetPal',
    buttons: [
      {
        text: 'Login',
        handler: () => {
          this.router.navigate(['/login']);
          return true;
        },
      },
      {
        text: 'Sign Up',
        handler: () => {
          this.router.navigate(['/signup']);
          return true;
        },
      },
      {
        text: 'Cancel',
        role: 'cancel',
      },
    ],
    cssClass: 'dark-action-sheet',
  });

  await actionSheet.present();
}


}

