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

    const drag = Gesture.Pan()
        .onChange(e => {
            translateX.value += e.changeX;
            translateY.value += e.changeY;
        })

    const imageStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value)
        }
    })

    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
            ]
        }
    })

    return (
        <GestureDetector gesture={drag}>
            <Animated.View style={[containerStyle, { top: -350 }]}>
                <GestureDetector gesture={doubleTap}>
                    <Animated.Image
                        source={stickerSource}
                        style={[imageStyle, { width: imageSize, height: imageSize }]}
                        resizeMode="contain"
                    />
                </GestureDetector>
            </Animated.View>
        </GestureDetector>
    )
}

export default EmojiSticker
