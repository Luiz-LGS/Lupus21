import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scryptAsync = promisify(scrypt);

export async function gerarHash(senha) {
    const salt = randomBytes(16).toString('hex');
    const hash = await scryptAsync(senha, salt, 64);
    return `scrypt:${salt}:${hash.toString('hex')}`;
}

export async function conferirSenha(senha, armazenada) {
    if (typeof senha !== 'string' || typeof armazenada !== 'string') return false;
    if (!armazenada.startsWith('scrypt:')) {
        // Compatibilidade com contas antigas; o repositorio migra apos o login.
        const recebida = Buffer.from(senha);
        const anterior = Buffer.from(armazenada);
        return recebida.length === anterior.length && timingSafeEqual(recebida, anterior);
    }
    const partes = armazenada.split(':');
    if (partes.length !== 3 || !/^[a-f0-9]{32}$/.test(partes[1]) || !/^[a-f0-9]{128}$/.test(partes[2])) return false;
    const hash = await scryptAsync(senha, partes[1], 64);
    return timingSafeEqual(hash, Buffer.from(partes[2], 'hex'));
}
