---
title: How I Setup My Raspberry Pi
date: 2019-03-20 14:23:00
meta:
  - name: description
    content: Troubleshooting GPG git commit signing
  - name: keywords
    content: github gitlab signing gpg git pgp linux cli javascript netherlands amsterdam js ecmascript es6 babel
---

## Troubleshooting GPG git commit signing

As part of setting up a new laptop recently, I was setting up git commit signing.

Despite having most of my configs in a git repository or otherwise tracked, I ran into a problem with setting this up.

Here’s the error:

```
$ git commit
error: gpg failed to sign the data
fatal: failed to write commit object
```
And the answer (for me):

Make sure the `user.signingkey` option in your `.gitconfig` is in the correct format! This is very silly, but there are some easy ways to get it wrong. First, some correct examples.

Standard long key format (recommended)


```
[user]
name = Tolga SAHIN
email = htolgasahin@gmail.com
signingkey = 0x4CEEB1E5A7FD15E1
```

That’s 0x followed by the last 16 characters of your key id. At least as of gnupg 2.2.0 its the standard output of a command like gpg --list-secret-keys

Long key format without the hexidecimal prefix


```
[user]
# ...
signingkey = 4CEEB1E5A7FD15E1
```

Still 16 characters, but without the prefix clarifying that the value is written in hexidecimal.

Short key format (works, but not recommended)


```
[user]
# ...
signingkey = A7FD15E1
```

This is the “short” format, consisting of only 8 characters. It works too, and was much more standard in the past. However its not recommended as its now far too easy to generate keys that have the same final 8 characters.

DOESN’T WORK: other key lengths

```
[user]
# ...
signingkey = CEEB1E5A7FD15E1
```
You might be assuming, like I did, that GPG and git would be smart enough to allow you to use any suffix of your key, much like git allows you to use any unique prefix of a git commit hash. That is not the case. I suppose it makes sense. Oh well.

Other useful debugging steps
While in my case the issue with my commit signing was simple user error, I did go through quite a few other debugging steps, and they were helpful in figuring out where the error was not! Here they are in case they are useful to me again later (quite likely), or others.

Many of these came from this helpful Stackoverflow thread.

Ensure basic encryption works
A simple way to test gpg and your secret key itself is to issue a command like the following:

```
echo "test" | gpg ---clearsign
```

This will send a small bit of text (“test”) to gpg, and have it print out the same text, but with a plaintext signature attached. If it works, then you know quite a few things are working: gpg itself, your secret key, whatever method you are using to enter the passkey to your key (if you have one, which you should!), etc.

GPG Agent settings, or lack thereof
GPG internally uses an “agent” program. Basically, whenever you run gpg, it launches a process in the background that will stick around. That process is used to remember your passphrase temporarily, for convenience, and probably other things.

In the past, ensuring the gpg command you run on the command line can communicate with this agent has been challenging. If you’ve ever seen instructions regarding adding various GPG_AGENT_INFO environment variables, its an attempt to properly set up this communication channel.

The good news is that as of GnuPG version 2.1.0, none of this is needed. There is now a “standard” method of connecting to the agent and everything is supposed to just work. Compare the instructions in the documentation for version 2.0 and the latest version to see what I mean.

GPG_TTY environment variable
This variable is important to set up. It will help GPG know which terminal it is running on, so that the prompt to enter your key passphrase is shown in the correct place. Again, from the GnuPG documentation, this will do the trick:

```
GPG_TTY=$(tty)
export GPG_TTY
```

Handling local terminal and SSH connections gracefully
There’s nothing worse than not being able to use gpg because you SSHed into your computer, and when you ran gpg, it popped up a dialog box to enter your passphrase on the computer display itself, rather than in your SSH session.

Fortunately, its easy to tell pinentry, the underlying program responsible for managing passphrase entry, to do the right thing during SSH sessions.


```
if [[ -n "$SSH_CONNECTION" ]]; then
export PINENTRY_USER_DATA="USE_CURSES=1"
fi
```
