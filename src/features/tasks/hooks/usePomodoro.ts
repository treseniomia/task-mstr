// import { useEffect, useRef, useState } from "react";
// import { audioService } from "../services/audioService";

// export const usePomodoro = (initialMinutes: number = 25) => {
//   const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
//   const [isActive, setIsActive] = useState(false);

//   // FIXED: Ginamit ang ReturnType para mawala ang 'number' vs 'Timeout' error
//   const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   useEffect(() => {
//     if (isActive && timeLeft > 0) {
//       timerRef.current = setInterval(() => {
//         setTimeLeft((prev) => prev - 1);
//       }, 1000);
//     } else if (timeLeft === 0) {
//       setIsActive(false);

//       // I-stop ang interval
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//         timerRef.current = null;
//       }

//       // STEP 2 TRIGGER: Play the "Ding!" sound
//       audioService.playFinishSound();
//     }

//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//     };
//   }, [isActive, timeLeft]);

//   const toggleTimer = () => setIsActive(!isActive);

//   const resetTimer = () => {
//     setIsActive(false);
//     // I-clear ang existing interval kung mayroon man
//     if (timerRef.current) {
//       clearInterval(timerRef.current);
//       timerRef.current = null;
//     }
//     setTimeLeft(initialMinutes * 60);
//   };

//   const formatTime = () => {
//     const mins = Math.floor(timeLeft / 60);
//     const secs = timeLeft % 60;
//     return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
//   };

//   return {
//     timeLeft,
//     isActive,
//     toggleTimer,
//     resetTimer,
//     formatTime,
//   };
// };

import { useEffect, useRef, useState } from "react";
import { audioService } from "../services/audioService";
import { timerStorage } from "../services/timerStorage";

export const usePomodoro = (initialMinutes: number = 25) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 1. INITIAL LOAD: Check kung may existing timer sa storage
  useEffect(() => {
    const checkPersistedTimer = async () => {
      const remaining = await timerStorage.getRemainingTime();
      if (remaining !== null && remaining > 0) {
        setTimeLeft(remaining);
        setIsActive(true); // Auto-resume kung hindi pa tapos ang oras
      }
    };
    checkPersistedTimer();
  }, []);

  // 2. TIMER LOGIC & PERSISTENCE TRIGGER
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      // Mag-save tayo ng end time sa storage tuwing mag-i-start ang timer
      timerStorage.saveEndTime(timeLeft);

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          if (newTime <= 0) return 0;
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);
  // Note: Nakadepende lang tayo sa isActive para hindi mag-loop ang storage save

  const handleTimerComplete = async () => {
    setIsActive(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    await timerStorage.clearTimer(); // Linisin ang storage
    audioService.playFinishSound();
  };

  const toggleTimer = () => {
    if (!isActive) {
      setIsActive(true);
    } else {
      setIsActive(false);
      timerStorage.clearTimer(); // I-clear kung i-pa-pause (optional, depende sa gusto mong behavior)
    }
  };

  const resetTimer = async () => {
    setIsActive(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    await timerStorage.clearTimer();
    setTimeLeft(initialMinutes * 60);
  };

  const formatTime = () => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return {
    timeLeft,
    isActive,
    toggleTimer,
    resetTimer,
    formatTime,
  };
};
