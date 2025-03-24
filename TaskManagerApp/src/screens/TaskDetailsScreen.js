import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Button, Card } from "react-native-paper";
import BASE_URL from "../../config";


const TaskDetailsScreen = ({ route, navigation }) => {
  const { taskId } = route.params;
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/tasks/${taskId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTask(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch task details.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleUpdate = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert("Error", "Both fields are required.");
      return;
    }

    setUpdating(true);
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.put(
        `${BASE_URL}/api/tasks/${taskId}`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Alert.alert("Success", "Task updated successfully!");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", "Failed to update task.");
      console.error(error);
    }
    setUpdating(false);
  };

  const handleDelete = async () => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("token");
              await axios.delete(`${BASE_URL}/api/tasks/${taskId}`, {
                headers: { Authorization: `Bearer ${token}` },
              });

              Alert.alert("Success", "Task deleted successfully!");
              navigation.navigate("Home");
            } catch (error) {
              Alert.alert("Error", "Failed to delete task.");
              console.error(error);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />;
  }

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Card style={{ padding: 20, borderRadius: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Edit Task</Text>

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

        {updating ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <>
            <Button mode="contained" onPress={handleUpdate} style={{ marginBottom: 10 }}>
              Update Task
            </Button>
            <Button mode="contained" onPress={handleDelete} color="red">
              Delete Task
            </Button>
          </>
        )}
      </Card>
    </View>
  );
};

export default TaskDetailsScreen;
