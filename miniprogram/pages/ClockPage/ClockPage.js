const addPreceedingZero = (t) => {
  return ('0' + Math.floor(t)).slice(-2);
}

Page({

  data: {
    current: 0,
    minutes: '00',
    seconds: '00',
    millseconds: '00',
  },

  onLoad: function(options) {

  },

  startTimer: function() {
    const start = +new Date();
   
    const t = setInterval(() => {
      const current = +new Date() - this.data.start;
      this.setData({
        current: current,
        minutes: addPreceedingZero(current / 1000 / 60),
        seconds: addPreceedingZero(current / 1000 % 60),
        millseconds: addPreceedingZero(current % 1000 / 10),
      });
    }, 10);

    this.setData({
      start: start,
      timer: t,
    });
  },

  stopTimer: function() {
    const {
      start,
      timer,
    } = this.data;
    const end = +new Date();
    clearInterval(timer);
    this.setData({
      end: end,
    })
  },


})