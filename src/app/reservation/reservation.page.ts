import { Component, OnInit, Inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {

  reservation: FormGroup;

  constructor(public modalcontroller: ModalController,
    private formBuilder: FormBuilder) {
      this.reservation = this.formBuilder.group({
        guest: 3,
        smoking: false,
        dateTime: ['', Validators.required]
      });
  }

  ngOnInit() {
  }

  dismiss() {
    this.modalcontroller.dismiss();
  }

  onSubmit() {
    console.log(this.reservation.value);
     this.modalcontroller.dismiss();
  }

}
