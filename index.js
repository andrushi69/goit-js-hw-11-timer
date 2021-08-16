
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
    let date = new Date();
    let secs = this.getSeconds(date);
    let mins = this.getMinutes(date);
    let hours = this.getHours(date);
    let days = this.getDays(date);
    return {secs, mins, hours, days}
  }

  getValues = () => {

    let numbers = this.getNumbers();
    let secsPlace = numbers.secs < 10 ? `0${numbers.secs}` : `${numbers.secs}`;
    let minsPlace = numbers.mins < 10 ? `0${numbers.mins}` : `${numbers.mins}`;
    let hoursPlace = numbers.hours < 10 ? `0${numbers.hours}` : `${numbers.hours}`;
    let number1 = this.initialNumOfDays.toString().length;
    let number2 = numbers.days.toString().length;
    let daysPlace = `${'0'.repeat(number1-number2)}${numbers.days}`;
    return {secsPlace, minsPlace, hoursPlace, daysPlace}
  }

  reflectInitialDate = () => {
    let values = this.getValues();
    document.querySelector(`${this.selector} span[data-value="secs"]`).textContent = values.secsPlace;
    document.querySelector(`${this.selector} span[data-value="mins"]`).textContent = values.minsPlace;
    document.querySelector(`${this.selector} span[data-value="hours"]`).textContent = values.hoursPlace;
    document.querySelector(`${this.selector} span[data-value="days"]`).textContent = values.daysPlace;
  }

  reflectTime = () => {
    let numbers = this.getNumbers();
    let values = this.getValues();

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
