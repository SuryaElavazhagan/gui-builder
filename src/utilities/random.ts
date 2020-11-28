function generateRandomNumber(from: number, to: number): number {
  const min = Math.ceil(from);
  const max = Math.floor(to);

  return Math.floor(Math.random() * (max - min)) + min;
}

export function generateHash(length: number = 10): string {
  const LETTER_POOL = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const SYMBOL_POOL = '-_';
  const HASH_POOL = LETTER_POOL + SYMBOL_POOL;
  const POOL_LENTH = HASH_POOL.length;
  const hash: string[] = [];
  let templength = length;
  
  while (templength !== 0) {
    hash.push(HASH_POOL.charAt(generateRandomNumber(0, POOL_LENTH)));
    templength--;
  }

  return hash.join('');
}