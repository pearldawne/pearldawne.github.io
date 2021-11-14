---
layout: post
title: VueJS Music Applet
tags: music vuejs webapps
description: Create a music applet for your favorite musical artist!
---

## Overview
Recently I was poking around <a href="https://codepen.io/" target="_blank">CodePen</a> and discovered some neat pens. As usual, I forked some of them and headed up to <a href="https://replit.com" target="_blank">Replit</a> to compile 'em .

I combined a glass UI background with the music player applet in the foreground. For the app's target, I just decided to make a mini streaming webapp for <a href="https://geoxor.moe" target="_blank">Geoxor</a>. (I hope he doesn't mind)

## Preview
Here is the live version of the app in action ➡ <a href="https://geoxor.muxsites.com" target="_blank">geoxor.muxsites.com</a>.
Or you can also have a look at it below. I've embedded the same thing here.

<iframe frameborder="0" marginwidth="0" marginheight="0" width="100%" height="620p" src="https://geoxor.muxsites.com/"></iframe>

## Source
Alright, people. Here you go! Here's the ridiculously beautiful code behind the applet.

I've named the files according to their default values, so that it's easier to deploy on your cloud platform or whatever.

#### Files
<a href="#index">index.html</a>, <a href="#style">style.css</a>, <a href="#script">script.js</a>, <a href="#script2">script2.js</a>

  <a id="index"></a>
The `index.html` file
```html
<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>Geoxor</title>
  <link rel="icon" href="https://geoxor.moe/favicon.ico">
  <link href="https://fonts.googleapis.com/css?family=Bitter:400,700&display=swap&subset=latin-ext" rel="stylesheet" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" /><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css'><link rel="stylesheet" href="./style.css">
  <meta name="description" content="INSERT META/SEO DESCRIPTION HERE">
  <meta name="keywords" content="INSERT META/SEO KEYWORDS HERE">
  <meta name="author" content="INSERT YOUR NAME HERE">


</head>
<body>
<canvas class="orb-canvas"></canvas>
<!-- partial:index.partial.html -->
<div class="wrapper" id="app">
      <div class="player">
        <div class="player__top">
          <div class="player-cover">
            <transition-group :name="transitionName">
                <div class="player-cover__item" v-if="$index === currentTrackIndex" :style="{ backgroundImage: `url(${track.cover})` }"  v-for="(track, $index) in tracks" :key="$index"></div>
            </transition-group>
          </div>
          <div class="player-controls">
            <div class="player-controls__item -favorite" :class="{ active : currentTrack.favorited }" @click="favorite">
              <svg class="icon">
                <use xlink:href="#icon-heart-o"></use>
              </svg>
            </div>
            <a :href="currentTrack.url" target="_blank" class="player-controls__item">
              <svg class="icon">
                <use xlink:href="#icon-link"></use>
              </svg>
            </a>
            <div class="player-controls__item" @click="prevTrack">
              <svg class="icon">
                <use xlink:href="#icon-prev"></use>
              </svg>
            </div>
            <div class="player-controls__item" @click="nextTrack">
              <svg class="icon">
                <use xlink:href="#icon-next"></use>
              </svg>
            </div>
            <div class="player-controls__item -xl js-play" @click="play">
              <svg class="icon">
                <use xlink:href="#icon-pause" v-if="isTimerPlaying"></use>
                <use xlink:href="#icon-play" v-else></use>
              </svg>
            </div>
          </div>
        </div>
        <div class="progress" ref="progress">
          <div class="progress__top">
            <div class="album-info" v-if="currentTrack">
              <div class="album-info__name">{{ currentTrack.artist }}</div>
              <div class="album-info__track">{{ currentTrack.name }}</div>
            </div>
            <div class="progress__duration">{{ duration }}</div>
          </div>
          <div class="progress__bar" @click="clickProgress">
            <div class="progress__current" :style="{ width : barWidth }"></div>
          </div>
          <div class="progress__time">{{ currentTime }}</div>
        </div>
        <div v-cloak></div>
      </div>
      <a href="https://open.spotify.com/artist/1gZm7WtVj8XuaRWeN0Ft6s" target="_blank" class="spotify-btn">
        Stream on Spotify
      </a>
      <a href="https://www.instagram.com/ariimaw" target="_blank" class="github-btn">
        Art by Ariimaw
      </a>
    </div>

    <svg xmlns="http://www.w3.org/2000/svg" hidden xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <symbol id="icon-heart-o" viewBox="0 0 32 32">
          <title>icon-heart-o</title>
          <path d="M22.88 1.952c-2.72 0-5.184 1.28-6.88 3.456-1.696-2.176-4.16-3.456-6.88-3.456-4.48 0-9.024 3.648-9.024 10.592 0 7.232 7.776 12.704 15.072 17.248 0.256 0.16 0.544 0.256 0.832 0.256s0.576-0.096 0.832-0.256c7.296-4.544 15.072-10.016 15.072-17.248 0-6.944-4.544-10.592-9.024-10.592zM16 26.56c-4.864-3.072-12.736-8.288-12.736-14.016 0-5.088 3.040-7.424 5.824-7.424 2.368 0 4.384 1.504 5.408 4.032 0.256 0.608 0.832 0.992 1.472 0.992s1.248-0.384 1.472-0.992c1.024-2.528 3.040-4.032 5.408-4.032 2.816 0 5.824 2.304 5.824 7.424 0.064 5.728-7.808 10.976-12.672 14.016z"></path>
          <path d="M16 30.144c-0.32 0-0.64-0.096-0.896-0.256-7.296-4.576-15.104-10.048-15.104-17.344 0-7.008 4.576-10.688 9.12-10.688 2.656 0 5.152 1.216 6.88 3.392 1.728-2.144 4.224-3.392 6.88-3.392 4.544 0 9.12 3.68 9.12 10.688 0 7.296-7.808 12.768-15.104 17.344-0.256 0.16-0.576 0.256-0.896 0.256zM9.12 2.048c-4.448 0-8.928 3.616-8.928 10.496 0 7.168 7.744 12.64 15.008 17.152 0.48 0.288 1.12 0.288 1.568 0 7.264-4.544 15.008-9.984 15.008-17.152 0-6.88-4.48-10.496-8.928-10.496-2.656 0-5.088 1.216-6.816 3.392l-0.032 0.128-0.064-0.096c-1.696-2.176-4.192-3.424-6.816-3.424zM16 26.688l-0.064-0.032c-3.808-2.4-12.768-8.032-12.768-14.112 0-5.152 3.072-7.52 5.952-7.52 2.432 0 4.48 1.536 5.504 4.096 0.224 0.576 0.768 0.928 1.376 0.928s1.152-0.384 1.376-0.928c1.024-2.56 3.072-4.096 5.504-4.096 2.848 0 5.952 2.336 5.952 7.52 0 6.080-8.96 11.712-12.768 14.112l-0.064 0.032zM9.12 5.248c-2.752 0-5.728 2.304-5.728 7.328 0 5.952 8.8 11.488 12.608 13.92 3.808-2.4 12.608-7.968 12.608-13.92 0-5.024-2.976-7.328-5.728-7.328-2.336 0-4.32 1.472-5.312 3.968-0.256 0.64-0.864 1.056-1.568 1.056s-1.312-0.416-1.568-1.056c-0.992-2.496-2.976-3.968-5.312-3.968z"></path>
          <path d="M6.816 20.704c0.384 0.288 0.512 0.704 0.48 1.12 0.224 0.256 0.384 0.608 0.384 0.96 0 0.032 0 0.032 0 0.064 0.16 0.128 0.32 0.256 0.48 0.384 0.128 0.064 0.256 0.16 0.384 0.256 0.096 0.064 0.192 0.16 0.256 0.224 0.8 0.576 1.632 1.12 2.496 1.664 0.416 0.128 0.8 0.256 1.056 0.32 1.984 0.576 4.064 0.8 6.112 0.928 2.688-1.92 5.312-3.904 8-5.792 0.896-1.088 1.92-2.080 2.912-3.104v-7.552c-0.096-0.128-0.192-0.288-0.32-0.416-0.768-1.024-1.184-2.176-1.6-3.296-0.768-0.416-1.536-0.8-2.336-1.12-0.128-0.064-0.256-0.096-0.384-0.16h-21.568v12.992c1.312 0.672 2.496 1.6 3.648 2.528z"></path>
        </symbol>
        <symbol id="icon-heart" viewBox="0 0 32 32">
          <title>icon-heart</title>
          <path d="M22.88 1.952c-2.72 0-5.184 1.28-6.88 3.456-1.696-2.176-4.16-3.456-6.88-3.456-4.48 0-9.024 3.648-9.024 10.592 0 7.232 7.776 12.704 15.072 17.248 0.256 0.16 0.544 0.256 0.832 0.256s0.576-0.096 0.832-0.256c7.296-4.544 15.072-10.016 15.072-17.248 0-6.944-4.544-10.592-9.024-10.592zM16 26.56c-4.864-3.072-12.736-8.288-12.736-14.016 0-5.088 3.040-7.424 5.824-7.424 2.368 0 4.384 1.504 5.408 4.032 0.256 0.608 0.832 0.992 1.472 0.992s1.248-0.384 1.472-0.992c1.024-2.528 3.040-4.032 5.408-4.032 2.816 0 5.824 2.304 5.824 7.424 0.064 5.728-7.808 10.976-12.672 14.016z"></path>
          <path d="M16 30.144c-0.32 0-0.64-0.096-0.896-0.256-7.296-4.576-15.104-10.048-15.104-17.344 0-7.008 4.576-10.688 9.12-10.688 2.656 0 5.152 1.216 6.88 3.392 1.728-2.144 4.224-3.392 6.88-3.392 4.544 0 9.12 3.68 9.12 10.688 0 7.296-7.808 12.768-15.104 17.344-0.256 0.16-0.576 0.256-0.896 0.256zM9.12 2.048c-4.448 0-8.928 3.616-8.928 10.496 0 7.168 7.744 12.64 15.008 17.152 0.48 0.288 1.12 0.288 1.568 0 7.264-4.544 15.008-9.984 15.008-17.152 0-6.88-4.48-10.496-8.928-10.496-2.656 0-5.088 1.216-6.816 3.392l-0.032 0.128-0.064-0.096c-1.696-2.176-4.192-3.424-6.816-3.424zM16 26.688l-0.064-0.032c-3.808-2.4-12.768-8.032-12.768-14.112 0-5.152 3.072-7.52 5.952-7.52 2.432 0 4.48 1.536 5.504 4.096 0.224 0.576 0.768 0.928 1.376 0.928s1.152-0.384 1.376-0.928c1.024-2.56 3.072-4.096 5.504-4.096 2.848 0 5.952 2.336 5.952 7.52 0 6.080-8.96 11.712-12.768 14.112l-0.064 0.032zM9.12 5.248c-2.752 0-5.728 2.304-5.728 7.328 0 5.952 8.8 11.488 12.608 13.92 3.808-2.4 12.608-7.968 12.608-13.92 0-5.024-2.976-7.328-5.728-7.328-2.336 0-4.32 1.472-5.312 3.968-0.256 0.64-0.864 1.056-1.568 1.056s-1.312-0.416-1.568-1.056c-0.992-2.496-2.976-3.968-5.312-3.968z"></path>
        </symbol>
        <symbol id="icon-infinity" viewBox="0 0 32 32">
          <title>icon-infinity</title>
          <path d="M29.312 20.832c-1.28 1.28-3.008 1.984-4.832 1.984s-3.52-0.704-4.832-1.984c-0.032-0.032-0.224-0.224-0.256-0.256v0 1.28c0 0.448-0.352 0.8-0.8 0.8s-0.8-0.352-0.8-0.8v-3.168c0-0.448 0.352-0.8 0.8-0.8h3.168c0.448 0 0.8 0.352 0.8 0.8s-0.352 0.8-0.8 0.8h-1.28c0.032 0.032 0.224 0.224 0.256 0.256 0.992 0.992 2.304 1.536 3.68 1.536 1.408 0 2.72-0.544 3.68-1.536 0.992-0.992 1.536-2.304 1.536-3.68s-0.544-2.72-1.536-3.68c-0.992-0.992-2.304-1.536-3.68-1.536-1.408 0-2.72 0.544-3.68 1.536l-8.416 8.448c-1.312 1.312-3.072 1.984-4.832 1.984s-3.488-0.672-4.832-1.984c-2.656-2.656-2.656-6.976 0-9.632s6.976-2.656 9.632 0c0.032 0.032 0.16 0.16 0.192 0.192l0.064 0.064v-1.28c0-0.448 0.352-0.8 0.8-0.8s0.8 0.352 0.8 0.8v3.168c0 0.448-0.352 0.8-0.8 0.8h-3.168c-0.448 0-0.8-0.352-0.8-0.8s0.352-0.8 0.8-0.8h1.28l-0.096-0.064c-0.032-0.032-0.16-0.16-0.192-0.192-0.992-0.992-2.304-1.536-3.68-1.536s-2.72 0.544-3.68 1.536c-2.048 2.048-2.048 5.344 0 7.392 0.992 0.992 2.304 1.536 3.68 1.536s2.72-0.544 3.68-1.536l8.512-8.512c1.28-1.28 3.008-1.984 4.832-1.984s3.52 0.704 4.832 1.984c2.624 2.656 2.624 7.008-0.032 9.664z"></path>
          <path d="M24.512 23.488c-1.6 0-3.136-0.512-4.416-1.44-0.128 0.704-0.736 1.248-1.44 1.248-0.8 0-1.472-0.672-1.472-1.472v-3.168c0-0.8 0.672-1.472 1.472-1.472h3.168c0.8 0 1.472 0.672 1.472 1.472 0 0.608-0.384 1.152-0.928 1.376 0.64 0.352 1.376 0.544 2.144 0.544 1.216 0 2.368-0.48 3.2-1.344 0.864-0.864 1.344-1.984 1.344-3.2s-0.48-2.368-1.344-3.2c-0.864-0.864-1.984-1.344-3.2-1.344s-2.368 0.48-3.2 1.344l-8.512 8.48c-1.408 1.408-3.296 2.176-5.312 2.176s-3.872-0.768-5.312-2.176c-2.912-2.912-2.912-7.68 0-10.592 1.408-1.408 3.296-2.176 5.312-2.176 0 0 0 0 0 0 1.6 0 3.136 0.512 4.416 1.44 0.128-0.704 0.736-1.248 1.472-1.248 0.8 0 1.472 0.672 1.472 1.472v3.168c0 0.8-0.672 1.472-1.472 1.472h-3.168c-0.8 0-1.472-0.672-1.472-1.472 0-0.608 0.384-1.152 0.928-1.376-0.64-0.352-1.376-0.544-2.144-0.544-1.216 0-2.368 0.48-3.2 1.344-1.76 1.76-1.76 4.64 0 6.432 0.864 0.864 2.016 1.344 3.2 1.344 1.216 0 2.368-0.48 3.2-1.344l8.48-8.544c1.408-1.408 3.296-2.208 5.312-2.208s3.872 0.768 5.312 2.208c1.408 1.408 2.176 3.296 2.176 5.312s-0.768 3.872-2.208 5.312v0c0 0 0 0 0 0-1.408 1.408-3.296 2.176-5.28 2.176zM18.752 18.912l1.44 1.44c1.152 1.152 2.688 1.792 4.32 1.792s3.168-0.64 4.32-1.792v0c1.152-1.152 1.792-2.688 1.792-4.32s-0.64-3.168-1.792-4.32c-1.152-1.152-2.688-1.792-4.352-1.792-1.632 0-3.168 0.64-4.32 1.792l-8.48 8.448c-1.12 1.12-2.592 1.728-4.16 1.728s-3.072-0.608-4.16-1.728c-2.304-2.304-2.304-6.048 0-8.352 1.12-1.12 2.592-1.728 4.16-1.728s3.072 0.608 4.16 1.728l1.44 1.408h-2.912c-0.064 0-0.128 0.064-0.128 0.128s0.064 0.128 0.128 0.128h3.168c0.064 0 0.128-0.064 0.128-0.128v-3.168c0-0.064-0.064-0.128-0.128-0.128s-0.128 0.064-0.128 0.128v2.912l-1.408-1.408c-1.152-1.152-2.688-1.792-4.352-1.792-1.632 0-3.168 0.64-4.32 1.792-2.4 2.4-2.4 6.272 0 8.672 1.152 1.152 2.688 1.792 4.32 1.792s3.168-0.64 4.32-1.792l8.512-8.512c1.12-1.12 2.592-1.728 4.16-1.728s3.072 0.608 4.16 1.728c1.12 1.12 1.728 2.592 1.728 4.16s-0.608 3.072-1.728 4.16c-1.12 1.12-2.592 1.728-4.16 1.728s-3.072-0.608-4.16-1.728l-1.408-1.408h2.912c0.064 0 0.128-0.064 0.128-0.128s-0.064-0.128-0.128-0.128h-3.168c-0.064 0-0.128 0.064-0.128 0.128v3.168c0 0.064 0.064 0.128 0.128 0.128s0.128-0.064 0.128-0.128v-2.88z"></path>
        </symbol>
        <symbol id="icon-pause" viewBox="0 0 32 32">
          <title>icon-pause</title>
          <path d="M16 0.32c-8.64 0-15.68 7.040-15.68 15.68s7.040 15.68 15.68 15.68 15.68-7.040 15.68-15.68-7.040-15.68-15.68-15.68zM16 29.216c-7.296 0-13.216-5.92-13.216-13.216s5.92-13.216 13.216-13.216 13.216 5.92 13.216 13.216-5.92 13.216-13.216 13.216z"></path>
          <path d="M16 32c-8.832 0-16-7.168-16-16s7.168-16 16-16 16 7.168 16 16-7.168 16-16 16zM16 0.672c-8.448 0-15.328 6.88-15.328 15.328s6.88 15.328 15.328 15.328c8.448 0 15.328-6.88 15.328-15.328s-6.88-15.328-15.328-15.328zM16 29.568c-7.488 0-13.568-6.080-13.568-13.568s6.080-13.568 13.568-13.568c7.488 0 13.568 6.080 13.568 13.568s-6.080 13.568-13.568 13.568zM16 3.104c-7.104 0-12.896 5.792-12.896 12.896s5.792 12.896 12.896 12.896c7.104 0 12.896-5.792 12.896-12.896s-5.792-12.896-12.896-12.896z"></path>
          <path d="M12.16 22.336v0c-0.896 0-1.6-0.704-1.6-1.6v-9.472c0-0.896 0.704-1.6 1.6-1.6v0c0.896 0 1.6 0.704 1.6 1.6v9.504c0 0.864-0.704 1.568-1.6 1.568z"></path>
          <path d="M19.84 22.336v0c-0.896 0-1.6-0.704-1.6-1.6v-9.472c0-0.896 0.704-1.6 1.6-1.6v0c0.896 0 1.6 0.704 1.6 1.6v9.504c0 0.864-0.704 1.568-1.6 1.568z"></path>
        </symbol>
        <symbol id="icon-play" viewBox="0 0 32 32">
          <title>icon-play</title>
          <path d="M21.216 15.168l-7.616-5.088c-0.672-0.416-1.504 0.032-1.504 0.832v10.176c0 0.8 0.896 1.248 1.504 0.832l7.616-5.088c0.576-0.416 0.576-1.248 0-1.664z"></path>
          <path d="M13.056 22.4c-0.224 0-0.416-0.064-0.608-0.16-0.448-0.224-0.704-0.672-0.704-1.152v-10.176c0-0.48 0.256-0.928 0.672-1.152s0.928-0.224 1.344 0.064l7.616 5.088c0.384 0.256 0.608 0.672 0.608 1.088s-0.224 0.864-0.608 1.088l-7.616 5.088c-0.192 0.16-0.448 0.224-0.704 0.224zM13.056 10.272c-0.096 0-0.224 0.032-0.32 0.064-0.224 0.128-0.352 0.32-0.352 0.576v10.176c0 0.256 0.128 0.48 0.352 0.576 0.224 0.128 0.448 0.096 0.64-0.032l7.616-5.088c0.192-0.128 0.288-0.32 0.288-0.544s-0.096-0.416-0.288-0.544l-7.584-5.088c-0.096-0.064-0.224-0.096-0.352-0.096z"></path>
          <path d="M16 0.32c-8.64 0-15.68 7.040-15.68 15.68s7.040 15.68 15.68 15.68 15.68-7.040 15.68-15.68-7.040-15.68-15.68-15.68zM16 29.216c-7.296 0-13.216-5.92-13.216-13.216s5.92-13.216 13.216-13.216 13.216 5.92 13.216 13.216-5.92 13.216-13.216 13.216z"></path>
          <path d="M16 32c-8.832 0-16-7.168-16-16s7.168-16 16-16 16 7.168 16 16-7.168 16-16 16zM16 0.672c-8.448 0-15.328 6.88-15.328 15.328s6.88 15.328 15.328 15.328c8.448 0 15.328-6.88 15.328-15.328s-6.88-15.328-15.328-15.328zM16 29.568c-7.488 0-13.568-6.080-13.568-13.568s6.080-13.568 13.568-13.568c7.488 0 13.568 6.080 13.568 13.568s-6.080 13.568-13.568 13.568zM16 3.104c-7.104 0-12.896 5.792-12.896 12.896s5.792 12.896 12.896 12.896c7.104 0 12.896-5.792 12.896-12.896s-5.792-12.896-12.896-12.896z"></path>
        </symbol>
        <symbol id="icon-link" viewBox="0 0 32 32">
        <title>link</title>
          <path d="M23.584 17.92c0 0.864 0 1.728 0 2.56 0 1.312 0 2.656 0 3.968 0 0.352 0.032 0.736-0.032 1.12 0.032-0.16 0.032-0.288 0.064-0.448-0.032 0.224-0.096 0.448-0.16 0.64 0.064-0.128 0.128-0.256 0.16-0.416-0.096 0.192-0.192 0.384-0.32 0.576 0.096-0.128 0.16-0.224 0.256-0.352-0.128 0.16-0.288 0.32-0.48 0.48 0.128-0.096 0.224-0.16 0.352-0.256-0.192 0.128-0.352 0.256-0.576 0.32 0.128-0.064 0.256-0.128 0.416-0.16-0.224 0.096-0.416 0.16-0.64 0.16 0.16-0.032 0.288-0.032 0.448-0.064-0.256 0.032-0.512 0.032-0.768 0.032-0.448 0-0.896 0-1.312 0-1.472 0-2.976 0-4.448 0-1.824 0-3.616 0-5.44 0-1.568 0-3.104 0-4.672 0-0.736 0-1.44 0-2.176 0-0.128 0-0.224 0-0.352-0.032 0.16 0.032 0.288 0.032 0.448 0.064-0.224-0.032-0.448-0.096-0.64-0.16 0.128 0.064 0.256 0.128 0.416 0.16-0.192-0.096-0.384-0.192-0.576-0.32 0.128 0.096 0.224 0.16 0.352 0.256-0.16-0.128-0.32-0.288-0.48-0.48 0.096 0.128 0.16 0.224 0.256 0.352-0.128-0.192-0.256-0.352-0.32-0.576 0.064 0.128 0.128 0.256 0.16 0.416-0.096-0.224-0.16-0.416-0.16-0.64 0.032 0.16 0.032 0.288 0.064 0.448-0.032-0.256-0.032-0.512-0.032-0.768 0-0.448 0-0.896 0-1.312 0-1.472 0-2.976 0-4.448 0-1.824 0-3.616 0-5.44 0-1.568 0-3.104 0-4.672 0-0.736 0-1.44 0-2.176 0-0.128 0-0.224 0.032-0.352-0.032 0.16-0.032 0.288-0.064 0.448 0.032-0.224 0.096-0.448 0.16-0.64-0.064 0.128-0.128 0.256-0.16 0.416 0.096-0.192 0.192-0.384 0.32-0.576-0.096 0.128-0.16 0.224-0.256 0.352 0.128-0.16 0.288-0.32 0.48-0.48-0.128 0.096-0.224 0.16-0.352 0.256 0.192-0.128 0.352-0.256 0.576-0.32-0.128 0.064-0.256 0.128-0.416 0.16 0.224-0.096 0.416-0.16 0.64-0.16-0.16 0.032-0.288 0.032-0.448 0.064 0.48-0.064 0.96-0.032 1.44-0.032 0.992 0 1.952 0 2.944 0 1.216 0 2.432 0 3.616 0 1.056 0 2.112 0 3.168 0 0.512 0 1.024 0 1.536 0 0 0 0 0 0.032 0 0.448 0 0.896-0.192 1.184-0.48s0.512-0.768 0.48-1.184c-0.032-0.448-0.16-0.896-0.48-1.184s-0.736-0.48-1.184-0.48c-0.64 0-1.28 0-1.92 0-1.408 0-2.816 0-4.224 0-1.44 0-2.848 0-4.256 0-0.672 0-1.344 0-2.016 0-0.736 0-1.472 0.192-2.112 0.576s-1.216 0.96-1.568 1.6c-0.384 0.64-0.544 1.376-0.544 2.144 0 0.672 0 1.376 0 2.048 0 1.28 0 2.56 0 3.84 0 1.504 0 3.040 0 4.544 0 1.408 0 2.848 0 4.256 0 0.992 0 1.952 0 2.944 0 0.224 0 0.448 0 0.64 0 0.864 0.224 1.76 0.768 2.464 0.16 0.192 0.288 0.384 0.48 0.576s0.384 0.352 0.608 0.512c0.32 0.224 0.64 0.384 1.024 0.512 0.448 0.16 0.928 0.224 1.408 0.224 0.16 0 0.32 0 0.48 0 0.896 0 1.792 0 2.72 0 1.376 0 2.784 0 4.16 0 1.536 0 3.040 0 4.576 0 1.312 0 2.656 0 3.968 0 0.768 0 1.536 0 2.336 0 0.416 0 0.832-0.032 1.248-0.128 1.504-0.32 2.784-1.6 3.104-3.104 0.128-0.544 0.128-1.056 0.128-1.568 0-0.608 0-1.184 0-1.792 0-1.408 0-2.816 0-4.224 0-0.256 0-0.512 0-0.768 0-0.448-0.192-0.896-0.48-1.184s-0.768-0.512-1.184-0.48c-0.448 0.032-0.896 0.16-1.184 0.48-0.384 0.384-0.576 0.768-0.576 1.248v0z"></path>
          <path d="M32 11.232c0-0.8 0-1.568 0-2.368 0-1.248 0-2.528 0-3.776 0-0.288 0-0.576 0-0.864 0-0.896-0.768-1.696-1.696-1.696-0.8 0-1.568 0-2.368 0-1.248 0-2.528 0-3.776 0-0.288 0-0.576 0-0.864 0-0.448 0-0.896 0.192-1.184 0.48s-0.512 0.768-0.48 1.184c0.032 0.448 0.16 0.896 0.48 1.184s0.736 0.48 1.184 0.48c0.8 0 1.568 0 2.368 0 1.248 0 2.528 0 3.776 0 0.288 0 0.576 0 0.864 0-0.576-0.576-1.12-1.12-1.696-1.696 0 0.8 0 1.568 0 2.368 0 1.248 0 2.528 0 3.776 0 0.288 0 0.576 0 0.864 0 0.448 0.192 0.896 0.48 1.184s0.768 0.512 1.184 0.48c0.448-0.032 0.896-0.16 1.184-0.48 0.352-0.256 0.544-0.64 0.544-1.12v0z"></path>
          <path d="M15.040 21.888c0.16-0.16 0.288-0.288 0.448-0.448 0.384-0.384 0.8-0.8 1.184-1.184 0.608-0.608 1.184-1.184 1.792-1.792 0.704-0.704 1.44-1.44 2.176-2.176 0.8-0.8 1.568-1.568 2.368-2.368s1.6-1.6 2.4-2.4c0.736-0.736 1.504-1.504 2.24-2.24 0.64-0.64 1.248-1.248 1.888-1.888 0.448-0.448 0.896-0.896 1.344-1.344 0.224-0.224 0.448-0.416 0.64-0.64 0 0 0.032-0.032 0.032-0.032 0.32-0.32 0.48-0.768 0.48-1.184s-0.192-0.896-0.48-1.184c-0.32-0.288-0.736-0.512-1.184-0.48-0.512 0.032-0.928 0.16-1.248 0.48-0.16 0.16-0.288 0.288-0.448 0.448-0.384 0.384-0.8 0.8-1.184 1.184-0.608 0.608-1.184 1.184-1.792 1.792-0.704 0.704-1.44 1.44-2.176 2.176-0.8 0.8-1.568 1.568-2.368 2.368s-1.6 1.6-2.4 2.4c-0.736 0.736-1.504 1.504-2.24 2.24-0.64 0.64-1.248 1.248-1.888 1.888-0.448 0.448-0.896 0.896-1.344 1.344-0.224 0.224-0.448 0.416-0.64 0.64 0 0-0.032 0.032-0.032 0.032-0.32 0.32-0.48 0.768-0.48 1.184s0.192 0.896 0.48 1.184c0.32 0.288 0.736 0.512 1.184 0.48 0.48 0 0.928-0.16 1.248-0.48v0z"></path>
        </symbol>
        <symbol id="icon-next" viewBox="0 0 32 32">
          <title>next</title>
          <path d="M2.304 18.304h14.688l-4.608 4.576c-0.864 0.864-0.864 2.336 0 3.232 0.864 0.864 2.336 0.864 3.232 0l8.448-8.48c0.864-0.864 0.864-2.336 0-3.232l-8.448-8.448c-0.448-0.448-1.056-0.672-1.632-0.672s-1.184 0.224-1.632 0.672c-0.864 0.864-0.864 2.336 0 3.232l4.64 4.576h-14.688c-1.248 0-2.304 0.992-2.304 2.272s1.024 2.272 2.304 2.272z"></path>
          <path d="M29.696 26.752c1.248 0 2.304-1.024 2.304-2.304v-16.928c0-1.248-1.024-2.304-2.304-2.304s-2.304 1.024-2.304 2.304v16.928c0.064 1.28 1.056 2.304 2.304 2.304z"></path>
        </symbol>
        <symbol id="icon-prev" viewBox="0 0 32 32">
          <title>prev</title>
          <path d="M29.696 13.696h-14.688l4.576-4.576c0.864-0.864 0.864-2.336 0-3.232-0.864-0.864-2.336-0.864-3.232 0l-8.448 8.48c-0.864 0.864-0.864 2.336 0 3.232l8.448 8.448c0.448 0.448 1.056 0.672 1.632 0.672s1.184-0.224 1.632-0.672c0.864-0.864 0.864-2.336 0-3.232l-4.608-4.576h14.688c1.248 0 2.304-1.024 2.304-2.304s-1.024-2.24-2.304-2.24z"></path>
          <path d="M2.304 5.248c-1.248 0-2.304 1.024-2.304 2.304v16.928c0 1.248 1.024 2.304 2.304 2.304s2.304-1.024 2.304-2.304v-16.928c-0.064-1.28-1.056-2.304-2.304-2.304z"></path>
        </symbol>
      </defs>
    </svg>
<!-- partial -->
  <script src='https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.10/vue.min.js'></script><script  src="./script.js"></script>
<script type="module" src="./script2.js"></script>
</body>
</html>

```

<a id="style"></a>
The `style.css` file
```css
*:root {
  --dark-color: hsl(var(--hue), 100%, 9%);
  --light-color: hsl(var(--hue), 95%, 98%);
  --base: hsl(var(--hue), 95%, 50%);
  --complimentary1: hsl(var(--hue-complimentary1), 95%, 50%);
  --complimentary2: hsl(var(--hue-complimentary2), 95%, 50%);

  --font-family: "Poppins", system-ui;

  --bg-gradient: linear-gradient(
    to bottom,
    hsl(var(--hue), 95%, 99%),
    hsl(var(--hue), 95%, 84%)
  );
}

.orb-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}

body {
  background: #dfe7ef;
  font-family: "Bitter", serif;
}

* {
  box-sizing: border-box;
}

.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
}

.wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-size: cover;
}
@media screen and (max-width: 700px), (max-height: 500px) {
  .wrapper {
    flex-wrap: wrap;
    flex-direction: column;
  }
}

.player {
  background: #eef3f7;
  width: 410px;
  min-height: 480px;
  box-shadow: 0px 15px 35px -5px rgba(50, 88, 130, 0.32);
  border-radius: 15px;
  padding: 30px;
}
@media screen and (max-width: 576px), (max-height: 500px) {
  .player {
    width: 95%;
    padding: 20px;
    margin-top: 75px;
    min-height: initial;
    padding-bottom: 30px;
    max-width: 400px;
  }
}
.player__top {
  display: flex;
  align-items: flex-start;
  position: relative;
  z-index: 4;
}
@media screen and (max-width: 576px), (max-height: 500px) {
  .player__top {
    flex-wrap: wrap;
  }
}
.player-cover {
  width: 300px;
  height: 300px;
  margin-left: -70px;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
  border-radius: 15px;
  z-index: 1;
}
@media screen and (max-width: 576px), (max-height: 500px) {
  .player-cover {
    margin-top: -70px;
    margin-bottom: 25px;
    width: 290px;
    height: 230px;
    margin-left: auto;
    margin-right: auto;
  }
}
.player-cover__item {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  position: absolute;
  left: 0;
  top: 0;
}
.player-cover__item:before {
  content: "";
  background: inherit;
  width: 100%;
  height: 100%;
  box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
  display: block;
  z-index: 1;
  position: absolute;
  top: 30px;
  transform: scale(0.9);
  filter: blur(10px);
  opacity: 0.9;
  border-radius: 15px;
}
.player-cover__item:after {
  content: "";
  background: inherit;
  width: 100%;
  height: 100%;
  box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
  display: block;
  z-index: 2;
  position: absolute;
  border-radius: 15px;
}
.player-cover__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
  user-select: none;
  pointer-events: none;
}
.player-controls {
  flex: 1;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
@media screen and (max-width: 576px), (max-height: 500px) {
  .player-controls {
    flex-direction: row;
    padding-left: 0;
    width: 100%;
    flex: unset;
  }
}
.player-controls__item {
  display: inline-flex;
  font-size: 30px;
  padding: 5px;
  margin-bottom: 10px;
  color: #acb8cc;
  cursor: pointer;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease-in-out;
}
@media screen and (max-width: 576px), (max-height: 500px) {
  .player-controls__item {
    font-size: 26px;
    padding: 5px;
    margin-right: 10px;
    color: #acb8cc;
    cursor: pointer;
    width: 40px;
    height: 40px;
    margin-bottom: 0;
  }
}
.player-controls__item::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #fff;
  transform: scale(0.5);
  opacity: 0;
  box-shadow: 0px 5px 10px 0px rgba(76, 70, 124, 0.2);
  transition: all 0.3s ease-in-out;
  transition: all 0.4s cubic-bezier(0.35, 0.57, 0.13, 0.88);
}
@media screen and (min-width: 500px) {
  .player-controls__item:hover {
    color: #532ab9;
  }
  .player-controls__item:hover::before {
    opacity: 1;
    transform: scale(1.3);
  }
}
@media screen and (max-width: 576px), (max-height: 500px) {
  .player-controls__item:active {
    color: #532ab9;
  }
  .player-controls__item:active::before {
    opacity: 1;
    transform: scale(1.3);
  }
}
.player-controls__item .icon {
  position: relative;
  z-index: 2;
}
.player-controls__item.-xl {
  margin-bottom: 0;
  font-size: 95px;
  filter: drop-shadow(0 11px 6px rgba(172, 184, 204, 0.45));
  color: #fff;
  width: auto;
  height: auto;
  display: inline-flex;
}
@media screen and (max-width: 576px), (max-height: 500px) {
  .player-controls__item.-xl {
    margin-left: auto;
    font-size: 75px;
    margin-right: 0;
  }
}
.player-controls__item.-xl:before {
  display: none;
}
.player-controls__item.-favorite.active {
  color: red;
}

[v-cloak] {
  display: none;
}

[v-cloak] > * {
  display: none;
}

.progress {
  width: 100%;
  margin-top: -15px;
  user-select: none;
}
.progress__top {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.progress__duration {
  color: #71829e;
  font-weight: 700;
  font-size: 20px;
  opacity: 0.5;
}
.progress__time {
  margin-top: 2px;
  color: #71829e;
  font-weight: 700;
  font-size: 16px;
  opacity: 0.7;
}

.progress__bar {
  height: 6px;
  width: 100%;
  cursor: pointer;
  background-color: #d0d8e6;
  display: inline-block;
  border-radius: 10px;
}

.progress__current {
  height: inherit;
  width: 0%;
  background-color: #a3b3ce;
  border-radius: 10px;
}

.album-info {
  color: #71829e;
  flex: 1;
  padding-right: 60px;
  user-select: none;
}
@media screen and (max-width: 576px), (max-height: 500px) {
  .album-info {
    padding-right: 30px;
  }
}
.album-info__name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
  line-height: 1.3em;
}
@media screen and (max-width: 576px), (max-height: 500px) {
  .album-info__name {
    font-size: 18px;
    margin-bottom: 9px;
  }
}
.album-info__track {
  font-weight: 400;
  font-size: 20px;
  opacity: 0.7;
  line-height: 1.3em;
  min-height: 52px;
}
@media screen and (max-width: 576px), (max-height: 500px) {
  .album-info__track {
    font-size: 18px;
    min-height: 50px;
  }
}

.github-btn {
  position: absolute;
  right: 40px;
  bottom: 80px;
  text-decoration: none;
  padding: 15px 25px;
  border-radius: 4px;
  box-shadow: 0px 4px 30px -6px rgba(36, 52, 70, 0.65);
  background: #f71bc42;
  color: #fff;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 16px;
  transition: all 0.3s ease-in-out;
}

.spotify-btn {
  position: absolute;
  right: 40px;
  bottom: 15px;
  text-decoration: none;
  padding: 15px 25px;
  border-radius: 4px;
  box-shadow: 0px 4px 30px -6px rgba(36, 52, 70, 0.65);
  background: #1DB954;
  color: #fff;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 16px;
  transition: all 0.3s ease-in-out;
}

@media screen and (min-width: 500px) {
  .github-btn:hover {
    transform: scale(1.1);
    box-shadow: 0px 17px 20px -6px rgba(36, 52, 70, 0.36);
  }
  .spotify-btn:hover {
    transform: scale(1.1);
    box-shadow: 0px 17px 20px -6px rgba(36, 52, 70, 0.36);
  }
}
@media screen and (max-width: 700px) {
  .github-btn {
    position: relative;
    bottom: auto;
    right: auto;
    margin-top: 20px;
  }
  .github-btn:active {
    transform: scale(1.1);
    box-shadow: 0px 17px 20px -6px rgba(36, 52, 70, 0.36);
  }
  .spotify-btn {
    position: relative;
    bottom: auto;
    right: auto;
    margin-top: 20px;
  }
  .spotify-btn:active {
    transform: scale(1.1);
    box-shadow: 0px 17px 20px -6px rgba(36, 52, 70, 0.36);
  }
}

.scale-out-enter-active {
  transition: all 0.35s ease-in-out;
}

.scale-out-leave-active {
  transition: all 0.35s ease-in-out;
}

.scale-out-enter {
  transform: scale(0.55);
  pointer-events: none;
  opacity: 0;
}

.scale-out-leave-to {
  transform: scale(1.2);
  pointer-events: none;
  opacity: 0;
}

.scale-in-enter-active {
  transition: all 0.35s ease-in-out;
}

.scale-in-leave-active {
  transition: all 0.35s ease-in-out;
}

.scale-in-enter {
  transform: scale(1.2);
  pointer-events: none;
  opacity: 0;
}

.scale-in-leave-to {
  transform: scale(0.55);
  pointer-events: none;
  opacity: 0;
}
```

<a id="script"></a>
The `script.js` file
\[Contains the VueJS script for the applet\]
```javascript
/*
design by Voicu Apostol.
design: https://dribbble.com/shots/3533847-Mini-Music-Player
I can't find any open music api or mp3 api so i have to download all musics as mp3 file.
You can fork on github: https://github.com/muhammederdem/mini-player
*/

new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Virtual",
          artist: "Geoxor",
          cover: "https://i1.sndcdn.com/artworks-DHSEEz9VvGadAVjB-TngqYw-t500x500.jpg",
          source: "https://mukto.muxworks.com/audio/geoxor_virtual.mp3",
          url: "https://www.youtube.com/watch?v=oklzVH8FfVQ",
          favorited: false
        },
        {
          name: "Ephemereal",
          artist: "Geoxor",
          cover: "https://i1.sndcdn.com/artworks-e5nD2KI7lujKBB2x-pOzMDQ-t500x500.jpg",
          source: "https://mukto.muxworks.com/audio/geoxor_ephemereal.mp3",
          url: "https://www.youtube.com/watch?v=Hbj3z8Db4Rk",
          favorited: true
        },
        {
          name: "World is Mine Remix",
          artist: "Geoxor, Hatsune Miku",
          cover: "https://i1.sndcdn.com/artworks-bXsPZGcymZx9AzVR-fAeStQ-t500x500.jpg",
          source: "https://mukto.muxworks.com/audio/geoxor_world-is-mine.mp3",
          url: "https://www.youtube.com/watch?v=U45x9qTr1lk",
          favorited: false
        },
        {
          name: "Nandayo",
          artist: "Geoxor",
          cover: "https://i1.sndcdn.com/artworks-zjxH6KjeqrzzdeOZ-EfwA7w-t500x500.jpg",
          source: "https://mukto.muxworks.com/audio/geoxor_nandayo.mp3",
          url: "https://www.youtube.com/watch?v=CbIAzErGzTM",
          favorited: false
        },
        {
          name: "Aether",
          artist: "Geoxor",
          cover: "https://i1.sndcdn.com/artworks-wTkuPhwL4Lb3lDAa-ei00pg-t500x500.jpg",
          source: "https://mukto.muxworks.com/audio/geoxor_aether.mp3",
          url: "https://www.youtube.com/watch?v=x2IE64sLXh4",
          favorited: true
        },
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});


```

<a id="script2"></a>
The `script2.js` file
\[Contains the VueJS script for the decorative background]
```javascript
import * as PIXI from "https://cdn.skypack.dev/pixi.js";
import { KawaseBlurFilter } from "https://cdn.skypack.dev/@pixi/filter-kawase-blur";
import SimplexNoise from "https://cdn.skypack.dev/simplex-noise";
import hsl from "https://cdn.skypack.dev/hsl-to-hex";
import debounce from "https://cdn.skypack.dev/debounce";

// return a random number within a range
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// map a number from 1 range to another
function map(n, start1, end1, start2, end2) {
  return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}

// Create a new simplex noise instance
const simplex = new SimplexNoise();

// ColorPalette class
class ColorPalette {
  constructor() {
    this.setColors();
    this.setCustomProperties();
  }

  setColors() {
    // pick a random hue somewhere between 220 and 360
    this.hue = ~~random(220, 360);
    this.complimentaryHue1 = this.hue + 30;
    this.complimentaryHue2 = this.hue + 60;
    // define a fixed saturation and lightness
    this.saturation = 95;
    this.lightness = 50;

    // define a base color
    this.baseColor = hsl(this.hue, this.saturation, this.lightness);
    // define a complimentary color, 30 degress away from the base
    this.complimentaryColor1 = hsl(
      this.complimentaryHue1,
      this.saturation,
      this.lightness
    );
    // define a second complimentary color, 60 degrees away from the base
    this.complimentaryColor2 = hsl(
      this.complimentaryHue2,
      this.saturation,
      this.lightness
    );

    // store the color choices in an array so that a random one can be picked later
    this.colorChoices = [
      this.baseColor,
      this.complimentaryColor1,
      this.complimentaryColor2
    ];
  }

  randomColor() {
    // pick a random color
    return this.colorChoices[~~random(0, this.colorChoices.length)].replace(
      "#",
      "0x"
    );
  }

  setCustomProperties() {
    // set CSS custom properties so that the colors defined here can be used throughout the UI
    document.documentElement.style.setProperty("--hue", this.hue);
    document.documentElement.style.setProperty(
      "--hue-complimentary1",
      this.complimentaryHue1
    );
    document.documentElement.style.setProperty(
      "--hue-complimentary2",
      this.complimentaryHue2
    );
  }
}

// Orb class
class Orb {
  // Pixi takes hex colors as hexidecimal literals (0x rather than a string with '#')
  constructor(fill = 0x000000) {
    // bounds = the area an orb is "allowed" to move within
    this.bounds = this.setBounds();
    // initialise the orb's { x, y } values to a random point within it's bounds
    this.x = random(this.bounds["x"].min, this.bounds["x"].max);
    this.y = random(this.bounds["y"].min, this.bounds["y"].max);

    // how large the orb is vs it's original radius (this will modulate over time)
    this.scale = 1;

    // what color is the orb?
    this.fill = fill;

    // the original radius of the orb, set relative to window height
    this.radius = random(window.innerHeight / 6, window.innerHeight / 3);

    // starting points in "time" for the noise/self similar random values
    this.xOff = random(0, 1000);
    this.yOff = random(0, 1000);
    // how quickly the noise/self similar random values step through time
    this.inc = 0.002;

    // PIXI.Graphics is used to draw 2d primitives (in this case a circle) to the canvas
    this.graphics = new PIXI.Graphics();
    this.graphics.alpha = 0.825;

    // 250ms after the last window resize event, recalculate orb positions.
    window.addEventListener(
      "resize",
      debounce(() => {
        this.bounds = this.setBounds();
      }, 250)
    );
  }

  setBounds() {
    // how far from the { x, y } origin can each orb move
    const maxDist =
      window.innerWidth < 1000 ? window.innerWidth / 3 : window.innerWidth / 5;
    // the { x, y } origin for each orb (the bottom right of the screen)
    const originX = window.innerWidth / 1.25;
    const originY =
      window.innerWidth < 1000
        ? window.innerHeight
        : window.innerHeight / 1.375;

    // allow each orb to move x distance away from it's x / y origin
    return {
      x: {
        min: originX - maxDist,
        max: originX + maxDist
      },
      y: {
        min: originY - maxDist,
        max: originY + maxDist
      }
    };
  }

  update() {
    // self similar "psuedo-random" or noise values at a given point in "time"
    const xNoise = simplex.noise2D(this.xOff, this.xOff);
    const yNoise = simplex.noise2D(this.yOff, this.yOff);
    const scaleNoise = simplex.noise2D(this.xOff, this.yOff);

    // map the xNoise/yNoise values (between -1 and 1) to a point within the orb's bounds
    this.x = map(xNoise, -1, 1, this.bounds["x"].min, this.bounds["x"].max);
    this.y = map(yNoise, -1, 1, this.bounds["y"].min, this.bounds["y"].max);
    // map scaleNoise (between -1 and 1) to a scale value somewhere between half of the orb's original size, and 100% of it's original size
    this.scale = map(scaleNoise, -1, 1, 0.5, 1);

    // step through "time"
    this.xOff += this.inc;
    this.yOff += this.inc;
  }

  render() {
    // update the PIXI.Graphics position and scale values
    this.graphics.x = this.x;
    this.graphics.y = this.y;
    this.graphics.scale.set(this.scale);

    // clear anything currently drawn to graphics
    this.graphics.clear();

    // tell graphics to fill any shapes drawn after this with the orb's fill color
    this.graphics.beginFill(this.fill);
    // draw a circle at { 0, 0 } with it's size set by this.radius
    this.graphics.drawCircle(0, 0, this.radius);
    // let graphics know we won't be filling in any more shapes
    this.graphics.endFill();
  }
}

// Create PixiJS app
const app = new PIXI.Application({
  // render to <canvas class="orb-canvas"></canvas>
  view: document.querySelector(".orb-canvas"),
  // auto adjust size to fit the current window
  resizeTo: window,
  // transparent background, we will be creating a gradient background later using CSS
  transparent: true
});

// Create colour palette
const colorPalette = new ColorPalette();

app.stage.filters = [new KawaseBlurFilter(30, 10, true)];

// Create orbs
const orbs = [];

for (let i = 0; i < 10; i++) {
  const orb = new Orb(colorPalette.randomColor());

  app.stage.addChild(orb.graphics);

  orbs.push(orb);
}

// Animate!
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  app.ticker.add(() => {
    orbs.forEach((orb) => {
      orb.update();
      orb.render();
    });
  });
} else {
  orbs.forEach((orb) => {
    orb.update();
    orb.render();
  });
}


```

## References
The following Codepen pens and developers should be acknowledged for the original concepts

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="qBWrRyg" data-user="JavaScriptJunkie" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/JavaScriptJunkie/pen/qBWrRyg">
  Mini Music Player - VueJS</a> by Muhammed Erdem (<a href="https://codepen.io/JavaScriptJunkie">@JavaScriptJunkie</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<br />
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="dyOVyZQ" data-user="atharvagangarde" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/atharvagangarde/pen/dyOVyZQ">
  Glass Ui</a> by Atharva Gangarde  (<a href="https://codepen.io/atharvagangarde">@atharvagangarde</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
