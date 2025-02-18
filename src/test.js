const { generateKeyPairSync } = require('crypto');
const fs = require('fs');

// Generar el par de claves
const { privateKey, publicKey } = generateKeyPairSync('ed25519', {
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  publicKeyEncoding: { type: 'spki', format: 'pem' },
});

// Guardar la clave privada en un archivo
fs.writeFileSync('privateKey.pem', privateKey);
console.log('Clave privada guardada en privateKey.pem');

// Guardar la clave pública en un archivo (opcional)
fs.writeFileSync('publicKey.pem', publicKey);
console.log('Clave pública guardada en publicKey.pem');