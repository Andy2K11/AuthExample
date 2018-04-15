# Security

1. Hashing
2. Signatures
3. Encryption

## Cipher Suite

1. Confidentiality: encryption      - AES
2. Integrity: HMAC functions        - SHA
3. Authenticity: digital signatures - RSA

[Open Web Application Security Project](https://www.owasp.org/index.php/Main_Page)

[Lets Encrypt](https://letsencrypt.org/)

[SSL Labs](https://www.ssllabs.com/ssltest/analyze.html?d=corductive.uk)

[HSTS Preload List](https://hstspreload.org/)

## Hasing

[Crack Hash](http://crackhash.com)

## Threat Modelling

1. Enumerate potential threats

## Tokens

* [JWT](https://jwt.io/introduction/)
* [JWT Public claims](https://www.iana.org/assignments/jwt/jwt.xhtml)

## Symettric

[GPG](https://www.gnupg.org/)


## Asymetric (PKI: Pulic Key Infrastructure / Public-Private key pairs)

* RSA
* [OpenSSL](https://www.openssl.org/)

## File Overview

[File Types](https://fileinfo.com/extension)

| Extension | Algorithm | Type | Application(s) | Use
| --------- | --------- | ---- | -------------- | ---
| .ppk      |           | Putty Private Key     | [Putty](https://www.chiark.greenend.org.uk/~sgtatham/putty/) | SSH
| .pem      | x509      | Privacy Enhanced Mail | [OpenSSL](https://www.openssl.org/) | Certification
| .gpg      |           | GNU Privacy Guard | [GPG](https://www.gnupg.org/) | Certification
| .pub      |           | Public Key | [ssh-keygen](https://www.freebsd.org/cgi/man.cgi?query=ssh-keygen&sektion=1&manpath=OpenBSD) | Public Key Infrastructure (PKI) / OpenSSH
| .key | | | | Avoid as used by too many programs
|

## Injection

[SQLMap](http://sqlmap.org/)

