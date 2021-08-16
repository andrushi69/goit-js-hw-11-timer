
class CountdownTimer {

  constructor(timeObj) {
    this.selector = timeObj.selector;
    this.targetDate = timeObj.targetDate;
    this.initialNumOfDays = Math.floor((this.targetDate - new Date()) / (1000 * 60 * 60 * 24));
  }

  getSeconds = currentDate => {
    return Math.floor(((this.targetDate - currentDate) % (1000 * 60)) / 1000);
  };

  getMinutes = currentDate => {
    return Math.floor(
      ((this.targetDate - currentDate) % (1000 * 60 * 60)) / (1000 * 60)
    );
  };

  getHours = currentDate => {
    return Math.floor(
      ((this.targetDate - currentDate) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
  };

  getDays = currentDate => {
    return Math.floor((this.targetDate - currentDate) / (1000 * 60 * 60 * 24));
  };

  getNumbers = () => {
    const date = new Date();
    const secs = this.getSeconds(date);
    const mins = this.getMinutes(date);
    const hours = this.getHours(date);
    const days = this.getDays(date);
    return {secs, mins, hours, days}
  }

  getValues = () => {

    const numbers = this.getNumbers();
    const secsPlace = numbers.secs < 10 ? `0${numbers.secs}` : `${numbers.secs}`;
    const minsPlace = numbers.mins < 10 ? `0${numbers.mins}` : `${numbers.mins}`;
    const hoursPlace = numbers.hours < 10 ? `0${numbers.hours}` : `${numbers.hours}`;
    const number1 = this.initialNumOfDays.toString().length;
    const number2 = numbers.days.toString().length;
    const daysPlace = `${'0'.repeat(number1-number2)}${numbers.days}`;
    return {secsPlace, minsPlace, hoursPlace, daysPlace}
  }

  reflectInitialDate = () => {
    const values = this.getValues();
    document.querySelector(`${this.selector} span[data-value="secs"]`).textContent = values.secsPlace;
    document.querySelector(`${this.selector} span[data-value="mins"]`).textContent = values.minsPlace;
    document.querySelector(`${this.selector} span[data-value="hours"]`).textContent = values.hoursPlace;
    document.querySelector(`${this.selector} span[data-value="days"]`).textContent = values.daysPlace;
  }

  reflectTime = () => {
    const numbers = this.getNumbers();
    const values = this.getValues();

    document.querySelector(`${this.selector} span[data-value="secs"]`).textContent = values.secsPlace;

    if (numbers.secs === 59) {
      document.querySelector(`${this.selector} span[data-value="mins"]`).textContent = values.minsPlace;
    }

    if (numbers.mins === 59) {
      document.querySelector(`${this.selector} span[data-value="hours"]`).textContent = values.hoursPlace;
    }

    if (numbers.hours === 11) {
      document.querySelector(`${this.selector} span[data-value="days"]`).textContent = values.daysPlace;
    }

    if (numbers.secs===0 && numbers.mins===0 && numbers.hours===0 && numbers.days===0) {
      clearInterval(this.timerId);
    }
  };

  startTimer = () => {
    this.timerId = setInterval(this.reflectTime, 1000);
  }
}

const countdownTimer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("September 28, 2021")

});

countdownTimer.reflectInitialDate();
countdownTimer.startTimer();
