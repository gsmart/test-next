// utils/checksum.ts
import { sha256 } from 'js-sha256';

export class ChecksumUtil {
  private static saltKey = process.env.NEXT_PUBLIC_SALT_KEY || 'your-salt-key';

  static generateChecksum(url: string, payload: any = {}, method: string = 'GET'): string {
    const methodLower = method.toLowerCase();

    if (['post', 'put', 'patch'].includes(methodLower)) {
      const sortedPayload = this.sortObjectKeys(payload);
      const bodyString = JSON.stringify(sortedPayload);
      const encodedBody = Buffer.from(bodyString).toString('base64');
      const finalText = encodedBody + this.saltKey;
      return sha256(finalText);
    } else if (['get', 'delete'].includes(methodLower)) {
      const parsedUrl = new URL(url);
      const pathAndQuery = parsedUrl.pathname + parsedUrl.search;
      const decodedPathAndQuery = decodeURIComponent(pathAndQuery);
      const encodedUrl = Buffer.from(decodedPathAndQuery).toString('base64');
      const finalText = encodedUrl + this.saltKey;
      return sha256(finalText);
    } else {
      throw new Error(`Unsupported method ${method}`);
    }
  }

  private static sortObjectKeys(obj: any): any {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.sortObjectKeys(item));
    }

    const sorted: any = {};
    Object.keys(obj).sort().forEach(key => {
      sorted[key] = this.sortObjectKeys(obj[key]);
    });
    return sorted;
  }
}