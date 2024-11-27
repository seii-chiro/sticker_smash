import { View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { captureRef } from "react-native-view-shot"

import { useEffect, useRef, useState } from "react";

import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { type ImageSource } from "expo-image";


import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from "@/components/EmojiPicker";
import ImageViewer from "@/components/ImageViewer";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";


const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const imageRef = useRef<View>(null)
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined)

  useEffect(() => {
    if (!status?.granted) {
      requestPermission();
    }
  }, [status])

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  }

  const onReset = () => {
    setShowAppOptions(false);
    setPickedEmoji(undefined);
    setSelectedImage(undefined);
  }

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      if (!imageRef.current) {
        console.error("imageRef is not available or null");
        alert("Could not capture image: ref is invalid");
        return;
      }

      const localURI = await captureRef(imageRef, {
        height: 440,
        quality: 1,
        format: 'jpg',
      });

      await MediaLibrary.saveToLibraryAsync(localURI);

      if (localURI) {
        alert("Saved!");
      }

    } catch (error: any) {
      console.error("Error during capture:", error);
    }
  };


  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false} style={styles.imageContainer}>
          <View collapsable={false}>
            <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
            {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
          </View>
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button label="Choose a photo" theme="primary" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});