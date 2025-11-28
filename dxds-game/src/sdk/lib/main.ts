import { EventEmitter } from "events";
import SDKCore, { type SDKConfig } from "./core";
import { SDKError, ErrorCodes } from "./error";

export type Method = "payment" | "login" | "getAssets" | "back";
class HashEpochSDK extends EventEmitter {
  public core;
  public ready = false;

  public on(event: "login", listener: (data: any) => void): this;
  public on(event: "logout", listener: () => void): this;
  public on(event: "assetUpdate", listener: (data: any) => void): this;
  public on(event: "visible", listener: (data: any) => void): this;

  public on(event: string, listener: (...args: any[]) => void): this {
    this.core.on(event, listener);

    return this;
  }

  private _initEventForwarding() {
    this.core.on("*", (eventName: string, data: any) => {
      this.emit(eventName, data);
    });
  }

  constructor(config: SDKConfig) {
    super();
    this.core = new SDKCore(config);
    this._init();
    this._initEventForwarding();
  }

  _init() {
    this.core.on("ready", () => this._handleReady());
    this.core.on("error", (err) => this._handleError(err));
  }

  async call(method: Method, params: any) {
    try {
      return await this.core.request({ method, params });
    } catch (err: any) {
      throw new SDKError(err.message, ErrorCodes.API_FAILURE);
    }
  }

  _handleReady() {
    this.ready = true;
    console.log("initialize success!");
  }
  _handleError(err: Error) {
    console.log("initialize error", err);
  }
}

export default HashEpochSDK;
