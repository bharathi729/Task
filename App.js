import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const pickVideo = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      });

      if (!result.cancelled) {
        const videoUri = result.uri;
        const videoInfo = await FileSystem.getInfoAsync(videoUri);

        setOriginalSize(videoInfo.size);
        await compressVideo(videoUri);
      }
    } else {
      console.log('Permission denied');
    }
  };

  const compressVideo = async (videoUri) => {
   
    // Example code for video compression using a library ffmpeg:
    // const compressedVideoUri = await ffmpeg.compressVideo(videoUri, options);
    // const compressedVideoInfo = await FileSystem.getInfoAsync(compressedVideoUri);

    // Mocking the compressed video size (80% reduction)
    const compressedVideoSize = Math.round(originalSize * 0.2);

    setCompressedSize(compressedVideoSize);
  };

  return (
    <View style={styles.container}>
      <Button title="Pick a Video" onPress={pickVideo} />

      {originalSize > 0 && (
        <Text style={styles.text}>
          Original Size: {(originalSize / (1024 * 1024)).toFixed(2)} MB
        </Text>
      )}

      {compressedSize > 0 && (
        <Text style={styles.text}>
          Compressed Size: {(compressedSize / (1024 * 1024)).toFixed(2)} MB
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  },
});
