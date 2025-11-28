/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ErrorCodes, SDKError } from "./error";

export type Rule = {
  required?: boolean;
};
/**
 * 生成唯一请求 ID（UUID v4 简化版）
 * @returns {string}
 */
export function generateRequestId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * 验证消息来源是否合法
 * @param {string} origin - 待验证的来源
 * @param {string|string[]} allowedOrigins - 白名单列表
 * @returns {boolean}
 */
export function validateOrigin(
  origin: string,
  allowedOrigins: string | Array<string>
) {
  if (!allowedOrigins) return false;
  const origins = Array.isArray(allowedOrigins)
    ? allowedOrigins
    : [allowedOrigins];
  return origins.some((pattern) => {
    if (pattern === "*" || pattern === origin) return true;
    if (pattern.startsWith("*.") && origin.endsWith(pattern.slice(1)))
      return true;
    return false;
  });
}

/**
 * 防抖函数
 * @param {Function} fn - 目标函数
 * @param {number} delay - 延迟时间(ms)
 * @param {boolean} immediate - 是否立即执行
 * @returns {Function}
 */
export function debounce<Args extends any[]>(
  fn: (...args: Args) => void,
  delay = 300,
  immediate = false
): (...args: Args) => void {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return (...args: Args) => {
    timer && clearTimeout(timer);

    if (immediate && !timer) {
      fn(...args);
    }

    timer = setTimeout(() => {
      !immediate && fn(...args);
      timer = undefined;
    }, delay);
  };
}

/**
 * 参数校验器
 * @param {Object} params - 待校验参数
 * @param {Object} rules - 校验规则
 * @throws {SDKError}
 */
export function validateParams(params: any, rules: Array<Rule>) {
  for (const [key, rule] of Object.entries(rules)) {
    const value = params[key];

    // 必填校验
    if (rule.required && (value === undefined || value === null)) {
      throw new SDKError(
        `Missing required parameter: ${key}`,
        ErrorCodes.INVALID_PARAMS
      );
    }
  }
}

/**
 * 错误对象序列化（保留关键信息）
 * @param {Error} error
 * @returns {Object}
 */
export function serializeError(error: Error) {
  if (error instanceof SDKError) {
    return {
      code: error.code,
      message: error.message,
    };
  }
  return {
    code: ErrorCodes.UNKNOWN_ERROR,
    message: error.message,
  };
}
