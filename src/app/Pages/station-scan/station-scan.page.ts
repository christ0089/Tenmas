import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { IRFC, RFC } from 'src/app/Models/rfc';
import { ApprovePage } from '../approve/approve.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { QuestionService } from 'src/app/Services/question.service';
import { filter, tap } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-station-scan',
  templateUrl: './station-scan.page.html',
  styleUrls: ['./station-scan.page.scss'],
})
export class StationScanPage {
  rfcScan = null;
  storeData = null;
  public register: FormGroup;
  private form = [];
  constructor(
    private barcode: BarcodeScanner,
    public firestore: AngularFirestore,
    private questionService: QuestionService,
    private storage: Storage,
    private loadingCtrl: LoadingController,
  ) {
    return;
    if (this.storage.get('company') != null) {
      this.storeData = this.storage.get('company');
      const ticketRef = this.firestore.collection('CompanyReq').doc(this.storeData.company);
      // Firestore observable, dismiss loader when data is available
      ticketRef.valueChanges()
        .pipe(
          filter(data => !!data),
          tap((data) => {
            this.register = this.questionService.toForm(data);
            Object.keys(data).forEach(element => {
              this.form.push({
                name: element,
                value: data[element]
              });
              this.register.get(element).setValue(data[element]);
            });
            this.loadingCtrl.dismiss();
          })
        );
    } else {

    }
  }
  ngOnInit() {

  }

  scanCodeV2() {
    this.barcode.scan({ formats: 'QR_CODE' }).then((data) => {
      this.rfcScan = new RFC();
      this.rfcScan = JSON.parse(data.text) as RFC;
      if (this.rfcScan == null) {
        return;
      }
    });
  }

  acceptTicket() {
    /*   if (this.register.valid === true) {
         const ticketData = {};
         this.form.forEach(element => {
           ticketData[element.name] = this.register.get(element.name).value;
         });
         const resultForm = { rfc: this.rfcScan, ...ticketData };
         this.firestore.collection('Tickets').doc(this.docId).update(resultForm);
       }*/
  }
}
