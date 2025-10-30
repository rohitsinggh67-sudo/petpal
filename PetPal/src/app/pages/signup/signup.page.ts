import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms'; // Import form modules
import { IonicModule, ModalController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { OtpModalComponent } from 'src/app/components/otp-modal/otp-modal.component'; // Import our new modal
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterLink, // For the "Log In" link
    ReactiveFormsModule, // For our form
    // Note: HttpClientModule is NOT needed here, it's provided in app.config.ts
  ],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup; // This will hold our form data

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private modalCtrl: ModalController
  ) {
    // Initialize the form with all 4 fields
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  // This function is called when the form is submitted
  onSubmit() {
    if (this.signupForm.invalid) {
      console.log('Form is invalid');
      return; // Stop if the form is invalid
    }

    console.log('Sending to backend:', this.signupForm.value);

    // This is the API call as requested in your prompt
    this.http
      .post('/api/auth/signup', this.signupForm.value)
      .pipe(
        catchError((err) => {
          // This will catch the 404 error because our backend doesn't exist yet
          console.error('Signup failed (this is expected for now):', err);

          // FOR TESTING: We'll show the OTP modal even on an error
          // In a real app, you might show an error alert instead
          this.presentOtpModal();

          return of(null); // Stops the error from crashing the app
        })
      )
      .subscribe((response) => {
        if (response) {
          // This part will run when the backend is real
          console.log('Signup successful:', response);
          this.presentOtpModal();
        }
      });
  }

  // This helper function opens the modal
  async presentOtpModal() {
    const modal = await this.modalCtrl.create({
      component: OtpModalComponent,
      backdropDismiss: false, // User can't click away to close
    });
    await modal.present();

    // Wait for the modal to be dismissed (by "Close" or "Verify")
    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log('OTP Verified:', data);
      // Here you would navigate to the app's home page
      // e.g., this.router.navigate(['/home']);
    } else {
      console.log('OTP Modal cancelled');
    }
  }

  onGoogleSignup() {
    console.log('Google Signup clicked');
    // This will call /api/auth/google
  }
}