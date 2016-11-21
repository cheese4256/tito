import * as crypto from 'crypto';

export class JwtService {
  // constructor
  public constructor() { }

  // public methods
  public encode(payload: any, secret: string): string {

    let algorithm: string = 'HS256';

    let header = {
      typ: 'JWT',
      alg: algorithm
    }

    let jwt: string =
      this.base64Encode(JSON.stringify(header)) + '.' +
      this.base64Encode(JSON.stringify(payload));

    return jwt + '.' + this.sign(jwt, secret);
  }

  public decode(token: string, secret: string): any {
    let segments: string[] = token.split('.');

    if (segments.length !== 3) {
      throw new Error("Token structure incorrect");
    }

    let header: string = JSON.parse(this.base64Decode(segments[0]));
    let payload: any = JSON.parse(this.base64Decode(segments[1]));

    let rawSignature: string = segments[0] + '.' + segments[1];

    if (!this.verify(rawSignature, secret, segments[2])) {
      throw new Error("Token verification failed.");
    }

    return payload;
  }

  // private methods
  private base64Encode(str: any): string {
    return new Buffer(str).toString('base64');
  }

  private base64Decode(str: any): string {
    return new Buffer(str, 'base64').toString();
  }

  private sign(str: string, key: string): string {
    return crypto.createHmac('sha256', key).update(str).digest('base64');
  }

  private verify(raw: string, secret: string, signature: string): boolean {
    return signature === this.sign(raw, secret);
  }
}
