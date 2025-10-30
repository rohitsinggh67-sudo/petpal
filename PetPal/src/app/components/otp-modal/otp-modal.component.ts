import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-otp-modal',
  templateUrl: './otp-modal.component.html',
  styleUrls: ['./otp-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule], // Make sure IonicModule is imported
})
export class OtpModalComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    // In a real app, you'd collect the OTP value
    const otp = '123456'; // Placeholder
    return this.modalCtrl.dismiss(otp, 'confirm');
  }

  resendCode() {
    console.log('Resend OTP code...');
  }
}