import { EventEmitter } from "events";
import { validateOrigin, generateRequestId } from "./utils";

type SystemEvent =
  | { type: "login"; data: any }
  | { type: "logout" }
  | { type: "assetUpdate"; data: any }
  | { type: "visible"; data: any };

export type SDKConfig = {
  targetWindow: Window;
  allowedOrigins: string | Array<string>;
  onLogin?: (data?: any) => void;
  onLogout?: () => void;
  onAssetUpdate?: (data: any) => void;
};
class SDKCore extends EventEmitter {
  public targetWindow;
  public allowedOrigins;
  public pendingRequests;

  constructor({ targetWindow, allowedOrigins }: SDKConfig) {
    super();
    this.targetWindow = targetWindow;
    this.allowedOrigins = allowedOrigins;
    this.pendingRequests = new Map();
    this._bindMessageListener();
  }

  _bindMessageListener() {
    window.addEventListener("message", this._handleMessage.bind(this));
  }

  _handleMessage(event: MessageEvent) {
    if (!validateOrigin(event.origin, this.allowedOrigins)) return;

    const { id, type, data, error } = event.data;

    if (type === "response" && this.pendingRequests.has(id)) {
      const { resolve, reject } = this.pendingRequests.get(id);
      this.pendingRequests.delete(id);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      error ? reject(error) : resolve(data);
    } else {
      if (type == "event") {
        this._handleSystemEvent(data);
      }
    }
  }

  private _handleSystemEvent(event: SystemEvent) {
    switch (event.type) {
      case "login":
        this.emit("login", event.data);
        break;
      case "logout":
        this.emit("logout");
        break;
      case "assetUpdate":
        this.emit("assetUpdate", event.data);
        break;
      case "visible":
        this.emit("visible", event.data);
        break;
      default:
        this.emit("unhandledEvent", event);
    }
  }

  async request(payload: any) {
    const id = generateRequestId();
    return new Promise((resolve, reject) => {
      this.pendingRequests.set(id, { resolve, reject });
      this.targetWindow.postMessage(
        { type: "request", id, payload, target: "hashgame-sdk" },
        "*"
      );
    });
  }
}

export default SDKCore;
