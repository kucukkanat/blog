---
title: How To Setup GPG
date: 2019-04-10 16:04:00
meta:
  - name: description
    content: How to setup GPG for Git
  - name: keywords
    content: gpg git linux pgp github gitlab digital signature
---

## Adding a GPG key to your account to sign commits

To verify the author of the commit this is how the GPG signing your commits work : 

### Check if you have G[NU]PG

Run `gpg --version` 

My output is : 

```
gpg (GnuPG) 2.2.13
libgcrypt 1.8.4
Copyright (C) 2019 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Home: /Users/hsahin/.gnupg
Supported algorithms:
Pubkey: RSA, ELG, DSA, ECDH, ECDSA, EDDSA
Cipher: IDEA, 3DES, CAST5, BLOWFISH, AES, AES192, AES256, TWOFISH,
        CAMELLIA128, CAMELLIA192, CAMELLIA256
Hash: SHA1, RIPEMD160, SHA256, SHA384, SHA512, SHA224
Compression: Uncompressed, ZIP, ZLIB, BZIP2
```

If you dont have GPG setup on your computer then [download here](https://gnupg.org/download/)

### Check for previously generated keys

Run 

```
gpg --list-keys
```

### Generate a GPG Key : 

Run `gpg --full-generate-key`

```
$ gpg --full-generate-key
gpg (GnuPG) 2.2.13; Copyright (C) 2019 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Please select what kind of key you want:
   (1) RSA and RSA (default)
   (2) DSA and Elgamal
   (3) DSA (sign only)
   (4) RSA (sign only)
Your selection? 
RSA keys may be between 1024 and 4096 bits long.
What keysize do you want? (2048) 4096
Requested keysize is 4096 bits       
Please specify how long the key should be valid.
         0 = key does not expire
      <n>  = key expires in n days
      <n>w = key expires in n weeks
      <n>m = key expires in n months
      <n>y = key expires in n years
Key is valid for? (0) 1y
Key expires at Sat Apr 11 11:45:54 2020 CEST
Is this correct? (y/N) y
                        
GnuPG needs to construct a user ID to identify your key.

Real name: Tolga SAHIN
Email address: htolgasahin@gmail.com
Comment: Example GPG KeyPair     
You selected this USER-ID:  
    "Tolga SAHIN (Example GPG KeyPair) <htolgasahin@gmail.com>"

Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? O
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
gpg: key 33740549F3B9BF87 marked as ultimately trusted
gpg: revocation certificate stored as '/Users/hsahin/.gnupg/openpgp-revocs.d/B217D2D7586E394A2C53E75133740549F3B9BF87.rev'
public and secret key created and signed.

pub   rsa4096 2019-04-12 [SC] [expires: 2020-04-11]
      B217D2D7586E394A2C53E75133740549F3B9BF87
uid                      Tolga SAHIN (Example GPG KeyPair) <htolgasahin@gmail.com>
sub   rsa4096 2019-04-12 [E] [expires: 2020-04-11]
```


### Tell Git Client About Your Key

The rest is pretty self explanatory. After you finish all the steps run `gpg --list-secret-keys --keyid-format LONG`

The ouput will be like : (Don't worry this is not my key I use currently :) )

```
sec   rsa4096/33740549F3B9BF87 2019-04-12 [SC] [expires: 2020-04-11]
      B217D2D7586E394A2C53E75133740549F3B9BF87
uid                 [ultimate] Tolga SAHIN (Example GPG KeyPair) <htolgasahin@gmail.com>
ssb   rsa4096/275AA5F060C81BA6 2019-04-12 [E] [expires: 2020-04-11]
```

Here `33740549F3B9BF87` is your signing key ID that we will use to tell your git client.

There are two waysto tell your git client with which key to sign. You may want to use different gpg keys for different local repos. For global : 

```
git config --global user.signingkey 33740549F3B9BF87
```

This will tell git to use this key to sign all the local repos. 

```
git config user.signingkey 33740549F3B9BF87
```

will instead set the individual repository's pointer to key.


### Sign your commits 

Use `-S` flag to sign your commits : 

```
git commit -S -m "your commit message"
```

If you dont want to add the flag in every single commit you can also set autosign flag to true by running 

```
git config commit.gpgsign true
```
or
```
git config --global commit.gpgSign true
```
for global.


### Tell gitlab about your public key : 

Run 
```
gpg --armor --export 33740549F3B9BF87
```
to export your public key and paste it to https://gitlab.com/profile/gpg_keys . 

Now you are good to go.

### Troubleshooting : 
You may have an error after you finish all the steps above like : 

```
error: gpg failed to sign the data
fatal: failed to write commit object
```

GPG needs to know about your [tty](https://en.wikipedia.org/wiki/Tty_(unix)) . 
In your `.bash_profile` (to find your bash profile go to `echo $HOME` folder, if it doesn't exist create it) export the variable `GPG_TTY`.
Add this line to your bash profile:

```
export GPG_TTY=$(tty)

```

You migh have a different GPG version on your machine previously. In this case you can tell git to use another version's binary to sign by setting your config's binary path like : 

```
git config --global gpg.program /usr/local/MacGPG2/bin/gpg2
```
Replace `/usr/local/MacGPG2/bin/gpg2` with anything

If everything goes well you will now see a `Verified` badge next to your commits in git history.

