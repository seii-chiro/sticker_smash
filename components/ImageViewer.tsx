import { StyleSheet, Text, View } from 'react-native'
import { Image, type ImageSource } from 'expo-image'

interface Props {
    imgSource: ImageSource;
    selectedImage?: string;
}

const ImageViewer = ({ imgSource, selectedImage }: Props) => {
    const imageSource = selectedImage ? { uri: selectedImage } : imgSource
    return <Image source={imageSource} style={styles.image} />
}

export default ImageViewer

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    },
})