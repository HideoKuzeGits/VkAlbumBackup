import {Injectable} from "@angular/core";

const CLIENT_ID = '127453201722-h3trgmnpsk2alq72a7e3fqbsoh938inq.apps.googleusercontent.com';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

@Injectable()
export class InitGrdiveApi {

  public init(): Promise<any> {
    return new Promise(function (resolve, reject) {
      $.getScript("https://apis.google.com/js/api.js")
        .then(resolve, reject);
    }).then(() => {
      return new Promise(function (resolve, reject) {
        return gapi.load('client:auth2', resolve);
      });
    }).then(() => this.initClient());
  }

  private initClient(): Promise<any> {
    return new Promise(function (resolve, reject) {
      $.getScript("https://apis.google.com/js/api.js")
        .then(resolve, reject);
    }).then(() => {
      gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
      });
    });
  }
}
