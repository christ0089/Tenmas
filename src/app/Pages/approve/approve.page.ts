import { Component, OnInit } from '@angular/core';
import { FirebaseFirestore } from '@angular/fire';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';
import { filter, tap } from 'rxjs/operators';
import { database } from 'firebase';
import { FormGroup } from '@angular/forms';
import { QuestionService } from 'src/app/Services/question.service';
import { RFC, IRFC } from 'src/app/Models/rfc';
import { RfcsService } from 'src/app/Services/rfcs.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.page.html',
  styleUrls: ['./approve.page.scss'],
})
export class ApprovePage implements OnInit {
  public register: FormGroup;
  result$: Observable<any>;
  docId: string;
  rfc: string;
  form: any[];
  constructor(
    public firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private questionService: QuestionService,
    private rfcService: RfcsService,
    private activeRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.docId = this.activeRoute.snapshot.paramMap.get('docId');
    this.rfc = this.activeRoute.snapshot.paramMap.get('rfc');
    if (this.docId == null) {
      return;
    }
    const ticketRef = this.firestore.collection('Tickets').doc(this.docId);
    // Firestore observable, dismiss loader when data is available
    console.log(this.docId);
    this.result$ = ticketRef.valueChanges()
      .pipe(
        filter(data => !!data),
        tap((data) => {
          console.log(data);
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
  }

  acceptTicket() {
    if (this.register.valid === true) {
      let ticketData = {};
      this.form.forEach(element => {
        ticketData[element.name] = this.register.get(element.name).value;
      });
      this.rfcService.rfcData(this.rfc).then((rfcData) => {
        const resultForm = { rfc: rfcData, ...ticketData };
        this.firestore.collection('Tickets').doc(this.docId).update(resultForm);
      });
    }
  }

}
