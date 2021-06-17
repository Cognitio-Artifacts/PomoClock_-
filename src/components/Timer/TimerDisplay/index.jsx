import { useEffect, useState, Fragment } from 'react';
import classnames from 'classnames';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { AUX } from './helper';

import './styles.scss';

const SIXTY = 60;
const A_THOUSAND_MILLIS = 1000;
const ZERO = 0;
const ZEROES = '00';
const TWENTY_FIVE = '25';

const TimerDisplay = () => {
  const [timeDisplay, setTimeDisplay] = useState({ minutes: TWENTY_FIVE, seconds: ZEROES })
  const [disabled, setDisabled] = useState(false);
  // eslint-disable-next-line no-use-before-define
  let countdown = 0;
  let runner;

  const handleStop = () => {
    runner.unsubscribe();
    setDisabled(false);
  }

  const handleClick = (minutes) => {
    const timeFrameInMillis = minutes * SIXTY * A_THOUSAND_MILLIS;
    const initialTimeInEpoch = new Date(2030, 0).getTime() + timeFrameInMillis;
    const runTimerUntil = minutes * SIXTY;
    countdown = initialTimeInEpoch;

    setDisabled(true);
    setTimeDisplay({
      seconds: ZEROES,
      minutes: AUX.formatString(minutes)
    })

    runner = interval(A_THOUSAND_MILLIS)
      .pipe(take(runTimerUntil))
      .subscribe(() => {
        countdown -= A_THOUSAND_MILLIS;
        const ticker = new Date(countdown);

        setTimeDisplay({
          seconds: AUX.formatString(ticker.getSeconds()),
          minutes: AUX.formatString(ticker.getMinutes())
        });

        const disableButtons = ticker.getMinutes() === ZERO && ticker.getSeconds() === ZERO;
        if (disableButtons) setDisabled(false);
      });
  }

  useEffect(() => {

  }, [timeDisplay])

  return (
    <Fragment>
      <div className="timer">
        <span className="timer-display-minutes">{timeDisplay.minutes}</span>
        <span className="timer-display-colon">:</span>
        <span className="timer-display-seconds">{timeDisplay.seconds}</span>
      </div>
      <div className="buttons">
        <button disabled={!!disabled} className={classnames('buttons', { 'button-disable': disabled })} onClick={() => handleClick(0.1)}>5'</button>
        <button disabled={!!disabled} className={classnames('buttons', { 'button-disable': disabled })} onClick={() => handleClick(15)}>15'</button>
        <button disabled={!!disabled} className={classnames('buttons', { 'button-disable': disabled })} onClick={() => handleClick(25)}>25'</button>
        <button disabled={!disabled} onClick={() => handleStop()}>STOP</button>
      </div>
    </Fragment>
  )
}

export { TimerDisplay }
