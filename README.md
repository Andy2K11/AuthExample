# Cryptography

Use this switch with node to set the cipher suite

    -tls-cipher-list='ECDHE-ECDSA-AES256-SHA'

## OpenSSL key pairs (PKCS#1)
To generate a elliptic curve file in pem format

    openssl ecparam -genkey -name secp521r1 -out ec.pem

And read the file

    openssl ec -in ec.pem -text -noout

Output just the private key part

    openssl ec -in ec.pem -out ec-private.pem

Output just the public key

    openssl ec -in ec.pem -pubout -out ec-public.pem

## OpenSSH / RFC4253

Generate a key

    ssh-keygen -t ecdsa -C "me@example.com" -f id_ecdsa

The private key is in PEM format the public key is in OpenSSH format which includes a PEM chunk

## PuTTYgen

Putty uses it's own .ppk format to create private keys

THe public key resembles PEM format but I couldn't read it with openssl
