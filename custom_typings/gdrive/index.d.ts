interface GapiClient {
  init(config: {
    discoveryDocs: string[],
    clientId: string,
    scope: string
  }): Promise<any>;
}

interface Auth2 {
  isSignedIn: any;
  getAuthInstance(): Auth2;
  signIn(): void;
}

interface Gapi {
  client: GapiClient;
  auth2: Auth2;

  load(name: String, callback: Function);
}

declare var gapi: Gapi;
