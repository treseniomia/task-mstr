import { Audio } from "expo-av";

export const audioService = {
  playFinishSound: async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../../../../assets/sounds/ding.mp3") // Siguraduhin ang path ng file mo
      );
      await sound.playAsync();

      // I-unload ang sound pagkatapos tumunog para makatipid sa memory
      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.isLoaded && status.didJustFinish) {
          await sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log("Error playing sound:", error);
    }
  },
};
