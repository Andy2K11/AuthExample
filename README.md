# Network Security

## Cryptography

Use this switch with node to set the cipher suite

    -tls-cipher-list='ECDHE-ECDSA-AES256-SHA'

### OpenSSL key pairs (PKCS#1)
To generate a elliptic curve file in pem format

    openssl ecparam -genkey -name secp521r1 -out ec.pem

And read the file

    openssl ec -in ec.pem -text -noout

Output just the private key part

    openssl ec -in ec.pem -out ec-private.pem

Output just the public key

    openssl ec -in ec.pem -pubout -out ec-public.pem

### OpenSSH / RFC4253

Generate a key

    ssh-keygen -t ecdsa -C "me@example.com" -f id_ecdsa

The private key is in PEM format the public key is in OpenSSH format which includes a PEM chunk

### PuTTYgen

Putty uses it's own .ppk format to create private keys

THe public key resembles PEM format but I couldn't read it with openssl

## Networking

### Tools

* [NMap](https://nmap.org/)
* [Wireshark](https://www.wireshark.org/)
* [Postman](https://www.getpostman.com/)
* [Fiddler](https://www.telerik.com/fiddler)

Windows hosts file location

    /c/Windows/System32/drivers/etc/

If adding a *server* to the hosts file then copy your public key:

    scp id_rsa.pub user@server:.ssh/id_rsa.pub

    $ cat id_rsa.pub >> authorized_keys

You can now simply ssh to the server by

    ssh user@server


