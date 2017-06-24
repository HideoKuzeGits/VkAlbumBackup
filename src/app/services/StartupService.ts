import {InitGrdiveApi} from "./g_drive/InitGrdiveApi";
import {Injectable} from "@angular/core";

@Injectable()
export class StartupService {


  constructor(private initGdiveApi: InitGrdiveApi) {
  }

  public load(): Promise<any> {
    return this.initGdiveApi.init();
  }
}
