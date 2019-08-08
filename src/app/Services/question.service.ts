import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IRFC } from '../Models/rfc';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor() {
  }

  toForm(questions) {
    let group: any = {};
    const keys = Object.keys(questions);
    keys.forEach(key => {
      group[key] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }
}
