


import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as firebaseRef from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Platform } from '@ionic/angular';

/*
 Generated class for the StoreServiceProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
*/
@Injectable()
export class PostPictureService {
  constructor(
    private platform: Platform,
    private camera: Camera) {

  }

  openGallery(): Promise<any> {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }

    return this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      let base64Image = null;
      console.log(imageData);
      if (this.platform.is('ios')) {
        base64Image = 'data:image/jpeg;base64,' + imageData;
      } else {
        base64Image = imageData;
      }
      return base64Image;
    }).catch((err) => {
    });

  };


  postPicture(url, path, key?) {
    const imageURL = key;
    return new Promise((resolve, reject) => {
      const storageRef = firebaseRef.storage().ref().child(path).child(imageURL);
      if (this.platform.is('ios')) {
        console.log("Uploading");
        const parseUpload = storageRef.putString(url, firebaseRef.storage.StringFormat.DATA_URL);
        parseUpload.then(() => {
          console.log("Success");
          return resolve(storageRef.getDownloadURL());
        }).catch((error) => {
          return reject(error);
        });
      } else {
        const parseUpload = storageRef.putString(url, 'base64', { contentType: 'image/jpeg' });
        parseUpload.then(() => {
          return resolve(storageRef.getDownloadURL());
        }).catch((error) => {
          return reject(error);
        });
      }
    });
  }
}