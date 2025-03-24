import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, Alert, RefreshControl } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Card, Button, FAB, ActivityIndicator } from "react-native-paper";
import BASE_URL from "../../config";


const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch tasks");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTasks().then(() => setRefreshing(false));
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    Alert.alert("Success", "Logged out successfully!");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {loading ? (
        <ActivityIndicator
          animating={true}
          size="large"
          color="blue"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={() => (
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Text style={{ fontSize: 18, color: "gray" }}>
                No tasks available. Add a task!
              </Text>
            </View>
          )}
          renderItem={({ item }) => (
            <Card
              style={{ marginBottom: 10, padding: 10 }}
              onPress={() =>
                navigation.navigate("TaskDetails", { taskId: item._id })
              }
            >
              <Card.Title title={item.title} />
              <Card.Content>
                <Text>{item.description}</Text>
              </Card.Content>
            </Card>
          )}
        />
      )}

      {/* Bottom Buttons: Logout on Left, Add Task on Right */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Button
          mode="contained"
          onPress={handleLogout}
          style={{ flex: 1, marginRight: 10 }}
        >
          Logout
        </Button>

        <FAB icon="plus" onPress={() => navigation.navigate("AddTask")} />
      </View>
    </View>
  );
};

export default HomeScreen;
