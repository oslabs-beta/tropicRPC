/**
 * @author : Steve Canavan, Ed Chow; August 1, 2020
 * @function : throttles execution of inputted function by inputted delay time
 * @param : {Function} fn - function to be throttled
 * @param : {number} delay - time that has to pass before passed in function gets executed
 * @returns : {Function} throttledFn - a function that checks elapsed time since last invocation
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 * * */

const throttle: Function = (fn: Function, delay: number): Function => {
  let last: number = 0;
  return function throttledFn(...args: any[]) {
    const now: number = new Date().getTime();
    if (now - last < delay) {
      return;
    }
    last = now;
    return fn(...args);
  };
};

module.exports = throttle;
