import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // ✅ Use RouterModule

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule, // ✅ Handles all routerLink stuff
  ],
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // ✅ LOGIN BUTTON HANDLER
  onEmailLogin() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;
    console.log('Form is valid. Data:', this.loginForm.value);
  }

  // ✅ GOOGLE LOGIN HANDLER
  onGoogleLogin() {
    console.log('Attempting Google Login...');
  }

  // ✅ PHONE LOGIN HANDLER (this one was missing!)
  onPhoneLogin() {
    console.log('Attempting Phone Login...');
  }

  goBack() {
  window.history.back();  // or use NavController for proper Ionic navigation
  // Example alternative:
  // this.navCtrl.back();
}

// ✅ Handle form submission (the HTML uses this)
onSubmit() {
  this.loginForm.markAllAsTouched();
  if (this.loginForm.invalid) return;
  console.log('Form submitted:', this.loginForm.value);
  // You can reuse your onEmailLogin() here if you want
  // this.onEmailLogin();
}

// ✅ Handle forgot password click
onForgotPassword() {
  console.log('Forgot password clicked!');
  // TODO: open reset password modal or navigate to reset page
}
  // ✅ GETTERS
  get email() {
    return this.loginForm?.get('email');
  }

  get password() {
    return this.loginForm?.get('password');
  }
}
