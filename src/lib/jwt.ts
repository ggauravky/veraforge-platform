const JWT_SECRET = process.env.JWT_SECRET || 'veraforge_admin_super_secret_jwt_key_2026_minimum_length_32_characters';

// Helper to base64url encode
function base64url(arr: Uint8Array): string {
  let bin = '';
  for (let i = 0; i < arr.byteLength; i++) {
    bin += String.fromCharCode(arr[i]);
  }
  return btoa(bin)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// Helper to base64url decode
function base64urlDecode(str: string): Uint8Array {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const bin = atob(base64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

export async function signJWT(payload: Record<string, any>): Promise<string> {
  const encoder = new TextEncoder();
  const header = { alg: 'HS256', typ: 'JWT' };
  
  const headerStr = base64url(encoder.encode(JSON.stringify(header)));
  const payloadStr = base64url(encoder.encode(JSON.stringify(payload)));
  
  const data = encoder.encode(`${headerStr}.${payloadStr}`);
  
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(JWT_SECRET),
    { name: 'HMAC', hash: { name: 'SHA-256' } },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', key, data);
  const signatureStr = base64url(new Uint8Array(signature));
  
  return `${headerStr}.${payloadStr}.${signatureStr}`;
}

export async function verifyJWT(token: string): Promise<Record<string, any> | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const [headerStr, payloadStr, signatureStr] = parts;
    const encoder = new TextEncoder();
    
    const data = encoder.encode(`${headerStr}.${payloadStr}`);
    const signature = base64urlDecode(signatureStr);
    
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(JWT_SECRET),
      { name: 'HMAC', hash: { name: 'SHA-256' } },
      false,
      ['verify']
    );
    
    const isValid = await crypto.subtle.verify('HMAC', key, signature as any, data);
    if (!isValid) return null;
    
    const payloadBytes = base64urlDecode(payloadStr);
    const payloadJSON = new TextDecoder().decode(payloadBytes);
    return JSON.parse(payloadJSON);
  } catch (err) {
    console.error('JWT verification error:', err);
    return null;
  }
}
