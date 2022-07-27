import { CommonException } from './CommonException';

/**
 * Assertion tool
 */
export class Assert {
  /**
   * no-null Assertion
   */
  static notNull(obj: any, errorCode: number, errorMsg: string) {
    if (!obj) {
      throw new CommonException(errorCode, errorMsg);
    }
  }

  /**
   * no-string Assertion
   */
  static notEmpty(obj: any, errorCode: number, errorMsg: string) {
    if (!obj || '' === obj.trim()) {
      throw new CommonException(errorCode, errorMsg);
    }
  }

  /**
   * boolean Assertion
   */
  static isTrue(expression: boolean, errorCode: number, errorMsg: string) {
    if (!expression) {
      throw new CommonException(errorCode, errorMsg);
    }
  }
}
