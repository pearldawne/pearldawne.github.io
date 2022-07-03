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
