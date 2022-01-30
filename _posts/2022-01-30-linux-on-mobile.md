---
layout: post
title:  "Install and use Linux on Android"
permalink: /linux-on-mobile
tags: linux android techtips os
---

Hey there! You must be thinking that running Linux on Android means that you would need to expel its default operating system itself. But that is not always the case, luckily!

If you want to fully install native Linux on your mobile device, then try [Ubuntu Touch]() or something similar. But if you would to keep both operating systems, then you've come to the right place! (Almost)

This post is about running Ubuntu (one of the most popular Linux/GNU distributions out there) via Termux. This would be sort of like running it in a virtual machine. But anyways, onto the main procedure!

## Requirements
- Termux (not the one on Google Play Store; you need the specialized one from F-Droid)
- Andronix (optional, since the commands have been posted here)
- VNC Viewer (suggested, although any other types of virtual network computer viewers can be used)

## Installation
To begin with, copy one of these whole segments of bash commands :

For [XFCE]() desktop environment
```bash
curl https://raw.githubusercontent.com/AndronixApp/AndronixOrigin/master/repo-fix.sh > repo.sh && chmod +x repo.sh && bash repo.sh && pkg update -y && pkg install wget curl proot tar -y && wget https://raw.githubusercontent.com/AndronixApp/AndronixOrigin/master/Installer/Ubuntu20/ubuntu20-xfce.sh -O ubuntu20-xfce.sh && chmod +x ubuntu20-xfce.sh && bash ubuntu20-xfce.sh
```

For [LXQT]() desktop environment
```bash
curl https://raw.githubusercontent.com/AndronixApp/AndronixOrigin/master/repo-fix.sh > repo.sh && chmod +x repo.sh && bash repo.sh && pkg update -y && pkg install wget curl proot tar -y && wget https://raw.githubusercontent.com/AndronixApp/AndronixOrigin/master/Installer/Ubuntu20/ubuntu20-lxqt.sh -O ubuntu20-lxqt.sh && chmod +x ubuntu20-lxqt.sh && bash ubuntu20-lxqt.sh
```

Once you've copied it, ride the sky and drop (paste) the LOOOOOOONG command in Termux. And simply type 'y' or 'yes' according to the prompts that pop-up. I assume you are not afraid of a little CLI, so those whizzing lines of text shouldn't be a phobia for you.

Have some patience as the first-time installation could take around 15-30 minutes or even longer! (depending on your phone's hardware specifications)

Once you are ready, you'll be asked to enter a password for the VNC server. Enter any number, e.g. 123456, and be sure to remember it!

## Running

Open up VNCViewer and add a new device with any name you want, with port address `127.0.0.1:5901`.
Add another one with another name of your choice, with port address 'localhost:1'.

Try connecting through both of those addresses. If none of them work, then head over to Termux and type `vncserver-stop`. If any ports are mentioned, type in `5901` (or the port number you last saw).

Now, type in `vncserver` or `vncserver-start`. This should start up the VNC server at port 1 of `localhost`. If the problem still persists, let me know!

## Re-launching

After closing down the app(s), you might want to jump into Linux mode again. So instead of re-installing the whole thing again, just type 'sudo ./start-ubuntu20.sh' into Termux to get the `vncserver` running again!

Job done! Congratulate yourself. You deserve it.
