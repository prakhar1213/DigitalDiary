import React, { useState } from 'react'
import { View, Image, StyleSheet, Button, Text } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

const ImgPicker = (props) => {
    const [selectedImage, setSelectedImage] = useState()


    const pickImageHandler = async () => {
        const pickedImage = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        })
        setSelectedImage(pickedImage.uri)
        props.onImageTaken(pickedImage.uri)
    }

    const takeImageHandler = async () => {
        const pickedImage = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        })
        setSelectedImage(pickedImage.uri)
        props.onImageTaken(pickedImage.uri)
    }



    return (
        <View>

            {!selectedImage ? (
                <View>
                    <Text style={{ textAlign: 'center', marginVertical: '2%' }}>No Image Picked Yet !</Text>
                </View>
            )
                : (
                    <View style={{ width: '100%', height: 400, borderColor: '#000000', borderWidth: 1, marginVertical: '5%' }}>
                        <Image source={{ uri: selectedImage }} style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }} />
                    </View>

                )}

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <Button
                    title="Pick A Image"
                    color="#B10000"
                    onPress={pickImageHandler}
                />
                <Button
                    title="Take A Image"
                    color="#B10000"
                    onPress={takeImageHandler}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default ImgPicker
