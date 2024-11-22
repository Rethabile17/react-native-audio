import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const FeedbackScreen = () => {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    
    console.log("Feedback Submitted:", { feedback, email });

  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Report an Issue or Provide Feedback</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Your Email (Optional)"
        value={email}
        onChangeText={setEmail}
      />
      
      <TextInput
        style={[styles.input, { height: 150 }]}
        placeholder="Your Feedback"
        multiline
        value={feedback}
        onChangeText={setFeedback}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Feedback</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default FeedbackScreen;
