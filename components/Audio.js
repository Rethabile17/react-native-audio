import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Share from "react-native-share";
import { Audio } from "expo-av";

const AudioScreen = ({ route, navigation }) => {
  const { email } = route.params;
  const [recordings, setRecordings] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioRecording, setAudioRecording] = useState(null);

  useEffect(() => {
    const fetchRecordings = async () => {
      const storedRecordings = await AsyncStorage.getItem(`recordings_${email}`);
      if (storedRecordings) {
        setRecordings(JSON.parse(storedRecordings));
      }
    };
    fetchRecordings();
  }, [email]);

  const startRecording = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) return alert("Permission to access microphone is required!");

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      setAudioRecording(recording);
      setIsRecording(true);
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  };

  const stopRecording = async () => {
    try {
      await audioRecording.stopAndUnloadAsync();
      const uri = audioRecording.getURI();

      const newRecording = { id: Date.now(), uri };
      const updatedRecordings = [...recordings, newRecording];

      setRecordings(updatedRecordings);
      await AsyncStorage.setItem(
        `recordings_${email}`,
        JSON.stringify(updatedRecordings)
      );

      setAudioRecording(null);
      setIsRecording(false);
    } catch (error) {
      console.error("Failed to stop recording:", error);
    }
  };

  const playRecording = async (uri) => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri });
      await sound.playAsync();
    } catch (error) {
      console.error("Failed to play recording:", error);
    }
  };

  const handleShare = async (uri) => {
    try {
      const shareOptions = {
        title: "Share Voice Note",
        url: uri,
      };
      await Share.open(shareOptions);
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Recordings</Text>
      <FlatList
        data={recordings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.recordingItem}>
            <TouchableOpacity onPress={() => playRecording(item.uri)}>
              <Text style={styles.recordingText}>Recording {item.id}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleShare(item.uri)}>
              <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.button}
          onPress={isRecording ? stopRecording : startRecording}
        >
          <Text style={styles.buttonText}>
            {isRecording ? "Stop Recording" : "Start Recording"}
          </Text>
        </TouchableOpacity>
      </View>
      <Button
        title="Give Feedback"
        onPress={() => navigation.navigate("Feedback")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  recordingItem: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recordingText: {
    fontSize: 16,
  },
  controls: {
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  shareText: {
    color: "blue",
    fontSize: 16,
    marginLeft: 10,
  },
});

export default AudioScreen;
