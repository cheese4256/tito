import * as crypto from 'crypto';
import * as config from 'config';

export class CryptoService {
  constructor() {}

  public generateSalt(): string {
    // get length from configuration
    let saltLength = config.get('crypto.salt.length') as number;

    // generate a random set of bytes
    let saltBytes = crypto.randomBytes(Math.ceil(saltLength*(4/3)));

    // convert to hex and slice to length
    return saltBytes.toString('base64').slice(0, saltLength);
  }

  public secureHash(value: string, salt: string): string {
    // get crypto algorithm from config
    let hashAlgorithm = config.get('crypto.hash.algorithm').toString();

    // generate the hash from salt & value pair
    let hash = crypto.createHmac(hashAlgorithm, salt).update(value);

    // convert to hex
    return hash.digest('base64');
  }
}
