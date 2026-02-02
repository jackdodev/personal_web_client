import { v4 as uuidv4, parse as uuidParse } from 'uuid';

export function generateId(type: string = 'all') {
  const u = uuidv4();
  const bytes = uuidParse(u);

  return type + ":" + toUrlSafeBase64(btoa(String.fromCharCode(...bytes)));
}

function toUrlSafeBase64(base64: string): string {
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
