class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.intervalId = 0;
    this.timerRef = document.querySelector(this.selector);
    this.daysRef = this.timerRef.querySelector('.value[data-value="days"]');
    this.hoursRef = this.timerRef.querySelector('.value[data-value="hours"]');
    this.minsRef = this.timerRef.querySelector('.value[data-value="mins"]');
    this.secsRef = this.timerRef.querySelector('.value[data-value="secs"]');
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  formatTimeValue(time) {
    if (time <= 0) {
      time = 0;
      clearInterval(this.intervalId);
    }
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }

  setTimerValues({ days, hours, mins, secs }) {
    this.daysRef.textContent = days;
    this.hoursRef.textContent = hours;
    this.minsRef.textContent = mins;
    this.secsRef.textContent = secs;
  }

  runTimer() {
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.targetDate - currentTime;
      this.setTimerValues(this.formatTimeValue(deltaTime));
    }, 1000);
  }
}

const currentTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jun 01, 2021, 13:46:00'),
});

currentTimer.runTimer();
