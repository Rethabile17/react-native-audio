import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const loadUserData = async () => {
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser) {
                const { userName, email } = JSON.parse(storedUser);
                setUserName(userName);
                setEmail(email);
            }
        };
        loadUserData();
    }, []);

    const handleSave = async () => {
        const updatedUser = { userName, email };
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        setIsEditing(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Profile</Text>

            <TextInput
                style={styles.input}
                placeholder="Username"
                value={userName}
                onChangeText={text => setUserName(text)}
                editable={isEditing}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                editable={isEditing}
            />

            {isEditing ? (
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
