import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const Countdown = () => {
  const targetDate = new Date("2024-11-10T00:00:00");
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const distance = targetDate - now;

      if (distance <= 0) {
        // Countdown is complete
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimeRemaining({ days, hours, minutes, seconds });
    };

    const interval = setInterval(calculateTimeRemaining, 1000);
    calculateTimeRemaining();

    return () => clearInterval(interval);
  }, [targetDate]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Confetti width={windowSize.width} height={windowSize.height} />
      <div className="countdown">
        <p className="countdown-title">Countdown bis zum großen Tag:</p>
        <div className="countdown-grid">
          <div className="countdown-item">
            <span className="countdown-value">{timeRemaining.days}</span>
            <p>Tage</p>
          </div>
          <div className="countdown-item">
            <span className="countdown-value">{timeRemaining.hours}</span>
            <p>Stunden</p>
          </div>
          <div className="countdown-item">
            <span className="countdown-value">{timeRemaining.minutes}</span>
            <p>Minuten</p>
          </div>
          <div className="countdown-item">
            <span className="countdown-value">{timeRemaining.seconds}</span>
            <p>Sekunden</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Countdown;
