/**
 * Context also save in redis
 */
export class UserContext {
  userId: number;
  username: string;
  phoneNum: string;
  constructor(userId: number, username: string, phoneNum: string) {
    this.userId = userId;
    this.username = username;
    this.phoneNum = phoneNum;
  }
}
