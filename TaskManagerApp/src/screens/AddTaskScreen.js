import React, { useState } from "react";
import { View, Text, TextInput, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Button, Card } from "react-native-paper";
import BASE_URL from "../../config";


const AddTaskScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddTask = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert("Error", "Both fields are required.");
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/api/tasks/`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        Alert.alert("Success", "Task added successfully!");
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to add task.");
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Card style={{ padding: 20, borderRadius: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Add a New Task</Text>

        <TextInput
          placeholder="Task Title"
          value={title}
          onChangeText={setTitle}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 10,
            marginBottom: 10,
          }}
        />

        <TextInput
          placeholder="Task Description"
          value={description}
          onChangeText={setDescription}
          multiline
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 10,
            height: 100,
            marginBottom: 20,
          }}
        />

        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <Button mode="contained" onPress={handleAddTask}>
            Add Task
          </Button>
        )}
      </Card>
    </View>
  );
};

export default AddTaskScreen;
