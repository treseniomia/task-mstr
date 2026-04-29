import { Audio } from "expo-av";

export const audioService = {
  playFinishSound: async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../../../../assets/sounds/ding.mp3")
      );
      await sound.playAsync();
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
