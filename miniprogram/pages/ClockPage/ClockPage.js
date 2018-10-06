const addPreceedingZero = (t) => {
  return ('0' + Math.floor(t)).slice(-2);
}

Page({

  data: {
    isTiming: false,
    current: 0,
    minutes: '00',
    seconds: '00',
    millseconds: '00',
    times: [],
  },

  onLoad: function(options) {

  },

  startOrPauseTimer: function() {
    const {
      isTiming,
    } = this.data;
    if (isTiming) {
      this.pauseTimer();
    } else {
      this.startTimer();
    }
  },

  pauseTimer: function() {
    const {
      timer,
    } = this.data;
    clearInterval(timer);
    this.setData({
      isTiming: false,
    });
  },


  startTimer: function() {
    const start = +new Date();
    const previous = this.data.current;
    const timer = this.data.timer;
    if (timer) {
      clearInterval(timer);
    }

    const t = setInterval(() => {
      const current = +new Date() - this.data.start + previous;
      this.setData({
        current: current,
        minutes: addPreceedingZero(current / 1000 / 60),
        seconds: addPreceedingZero(current / 1000 % 60),
        millseconds: addPreceedingZero(current % 1000 / 10),
      });
    }, 130);

    this.setData({
      start: start,
      timer: t,
      isTiming: true,
    });
  },

  resetTimerOrRecordTime: function() {
    const {
      isTiming,
    } = this.data;
    if (isTiming) {
      this.recordTime();
    } else {
      this.resetTimer();
    }
    ``
  },

  resetTimer: function() {
    const {
      start,
      timer,
    } = this.data;
    const end = +new Date();
    if (timer) {
      clearInterval(timer);
    }
    this.setData({
      isTiming: false,
      current: 0,
      minutes: '00',
      seconds: '00',
      millseconds: '00',
      end: end,
      times: [],
    });
  },

  recordTime: function() {
    const {
      times,
      current
    } = this.data;
    times.push({
      current: current,
      text: addPreceedingZero(current / 1000 / 60) + ':' + addPreceedingZero(current / 1000 % 60) + ':' + addPreceedingZero(current % 1000 / 10),
    });
    this.setData({
      times: times
    });


  },
})