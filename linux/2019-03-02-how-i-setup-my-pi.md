---
title: How I Setup My Raspberry Pi
date: 2019-03-02 16:00:00
meta:
  - name: description
    content: Raspberr Pi Setup
  - name: keywords
    content: raspberry pi raspbeerypi linux cli javascript array methods netherlands amsterdam js ecmascript es6 babel
---

<CenterImage imageSrc="pi_wooden.png"></CenterImage>

For a while I wanted a raspberry pi and finally got one with a [PiTFT](https://learn.adafruit.com/adafruit-pitft-28-inch-resistive-touchscreen-display-raspberry-pi/resistive-touchscreen-manual-install-calibrate) and a [Waveshare e Paper](https://www.waveshare.com/wiki/2.7inch_e-Paper_HAT) screen.

To get started with a raspberry pi there are things you need to know first: 

With a Pi you can :
* Create a media server for your home [Here is an example blog post](https://www.electromaker.io/tutorial/blog/how-to-make-a-raspberry-pi-media-server)
* Create a portable development environment (only if you are comfortable with using command line, ssh, vim, nano, git etc.)
* Use it as a cheap education station for teaching programming. It comes with common programming languages built in. 

But you can not:
* Use it for gaming (except you are not going for some retro gaming)
* Heavy browsing (Chromium on raspbian is a bit underperformant in my experience)
* Use it for tasks requiring heavy CPU or GPU such as machine learning, image processing etc.

Pi is also a great way to start getting used to/comfortable with linux environments.

## What do you need ? 

You will need a raspberry pi and an SD card to use your harddrive. Pi doesn't come with a memory built in so you will need to buy an SD card at least 8GB big. 

**Note**: If you're planning to use a card of 64GB or more with NOOBS, see [this page](https://www.raspberrypi.org/documentation/installation/sdxc_formatting.md) first.

There are two different ways to setup your Pi. Using [NOOBS](https://www.raspberrypi.org/documentation/installation/noobs.md) or directly creating a Raspbian (or another bootable raspberry image) card. I will not cover how to use NOOBS in this post.

So in short we need : 
* A [Raspberry Pi  €39.95 on Kiwi Electronics](https://www.kiwi-electronics.nl/raspberry-pi-3-model-b-plus?search=raspberry%20pi&description=true)
* A [micro usb cable](https://www.kiwi-electronics.nl/USB-A-naar-Micro-B-kabel-USB20-5-meter?lang=en)
* A monitor for easier installation and an [HDMI Cable](https://www.kiwi-electronics.nl/hdmi20-high-speed-kabel-2m?search=hdmi&description=true)
* A *wired* keyboard and a **wired** mouse. (It is important that your mouse is a wired usb mouse. My wireless trust mouse had a delay moving so I had to switch to my wired microsoft usb mouse.)
* A micro SD card minimum 8GB

## Lets start

#### Step 1 - Install Raspbian to your SD Card

Download the image from Raspberry Pi website [Downlaods Page](https://www.raspberrypi.org/downloads/)

Download [Etcher] (https://etcher.io/)

 - Connect an SD card reader with the SD card inside.
 - Open Etcher and select from your hard drive the Raspberry Pi .img or  .zip file you wish to write to the SD card.
 - Select the SD card you wish to write your image to.
 - Review your selections and click 'Flash!' to begin writing data to the SD card.

#### Step 2 - Start Raspberry Pi

Plug your keyboard, mouse, monitor via HDMI cable, and insert your SD card. 

**NOTE :** It is important that you plug HDMI cable before powering your Pi with the micro USB cable **!!!** Your Pi will recognize the HDMI while booting. If you plug HDMI cable after powering your Pi you will see nothing on the monitor. 

Power up your Raspi by plugging the micro usb cable. 


You should something like this this on your screen :

![Pi Boot Screen](https://raspberrycoulis.files.wordpress.com/2015/10/raspi2boot.jpg?w=1400)

Voila! Now you can setup the rest of your preferences and your raspi is good to go! 




