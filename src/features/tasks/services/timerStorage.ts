import AsyncStorage from "@react-native-async-storage/async-storage";

const TIMER_KEY = "@pomodoro_end_time";

export const timerStorage = {
  saveEndTime: async (secondsLeft: number) => {
    const endTime = Date.now() + secondsLeft * 1000;
    await AsyncStorage.setItem(TIMER_KEY, endTime.toString());
  },
  getRemainingTime: async () => {
    const endTimeStr = await AsyncStorage.getItem(TIMER_KEY);
    if (!endTimeStr) return null;

    const remaining = Math.round((parseInt(endTimeStr) - Date.now()) / 1000);
    return remaining > 0 ? remaining : 0;
  },
  clearTimer: async () => {
    await AsyncStorage.removeItem(TIMER_KEY);
  },
};
