import { Link, Stack } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

const NotFoundScreen = () => {
    return (
        <>
            <Stack.Screen options={{ title: "Screen don't exist." }} />
            <View style={styles.content}>
                <Link href="/" style={styles.linkColor}>Go Home</Link>
            </View>
        </>
    )
}

export default NotFoundScreen

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#25292e',
    },
    linkColor: {
        color: 'white',
    }
})