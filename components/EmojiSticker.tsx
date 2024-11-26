import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { type ImageSource } from 'expo-image';
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

interface Props {
    imageSize: number;
    stickerSource: ImageSource;
};

const EmojiSticker = ({ imageSize, stickerSource }: Props) => {
    const scaleImage = useSharedValue(imageSize);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            if (scaleImage.value !== imageSize * 2) {
                scaleImage.value = scaleImage.value * 2;
            } else {
                scaleImage.value = Math.round(scaleImage.value / 2)
            }
        })

    const imageStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value)
        }
    })

    return (
        <Animated.View style={{ top: -350 }}>
            <GestureDetector gesture={doubleTap}>
                <Animated.Image source={stickerSource} style={[imageStyle, { width: imageSize, height: imageSize }]} resizeMode="contain" />
            </GestureDetector>
        </Animated.View>
    )
}

export default EmojiSticker
