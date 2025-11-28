export const ErrorCodes = {
  API_FAILURE: 1001,
  NETWORK_ERROR: 1002,
  INVALID_PARAMS: 1003,
  UNKNOWN_ERROR: 0,
};

export class SDKError extends Error {
  public code;

  constructor(message: string, code: number) {
    super(message);
    this.name = "SDKError";
    this.code = code || ErrorCodes.API_FAILURE;
  }

  toJSON() {
    return { code: this.code, message: this.message };
  }
}
