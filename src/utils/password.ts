import sha256 from 'crypto-js/sha256';

export const hash = (password: string) => {
    return sha256(password).toString();
}
