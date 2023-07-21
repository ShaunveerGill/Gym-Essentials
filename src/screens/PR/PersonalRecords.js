import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RecordsContext } from "../../context/RecordsContext";
import { auth } from "../../../firebase";
import { fetchRecords } from "../../data/userServices";

function renderRecordItem(itemData) {
  return <RecordItem {...itemData.item} />;
}

function RecordItem({ id, exercise, record, date }) {
  const navigation = useNavigation();

  function recordPressHandler() {
    navigation.navigate("ManageRecord", {
      recordId: id,
    });
  }

  return (
    <Pressable
      onPress={recordPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.recordItem}>
        <View>
          <Text style={[styles.textBase, styles.exercise]}>{exercise}</Text>
          <Text style={styles.textBase}>{(date.toISOString().slice(0, 10))}</Text>
        </View>
        <View style={styles.recordContainer}>
          <Text style={styles.record}>{record}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const PersonalRecords = () => {
  const navigation = useNavigation();

  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const recordsCtx = useContext(RecordsContext);
    const user = auth.currentUser;

  const handleAddRecord = () => {
    navigation.navigate("ManageRecord");
  };



  useEffect(() => {
    async function getRecords() {
      setIsFetching(true);
      try {
        const records = await fetchRecords(user.uid);
        recordsCtx.setRecords(records);
      } catch (error) {
        setError("Could not fetch personal records!");
      }
      setIsFetching(false);
    }
    getRecords();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Personal Records",
      headerRight: () => (
        <TouchableOpacity
          onPress={handleAddRecord}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <Ionicons
            name="add"
            size={24}
            color="black"
            style={styles.addButton}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  let content = <Text style={styles.infoText}>No Records Added</Text>;

  if (recordsCtx.records.length > 0) {
    content = (
      <FlatList
        data={recordsCtx.records}
        renderItem={renderRecordItem}
        keyExtractor={(item) => item.id}
      />
    );
  }

  if (error && !isFetching) {
    return (
      <View style={styles.errorContainer}>
        <Text style={[styles.errorText, styles.errorTitle]}>
          An error occurred!
        </Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (isFetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return <View style={styles.container}>{content}</View>;
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  infoText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
  recordItem: {
    padding: 15,
    marginVertical: 14,
    flexDirection: "row",
    backgroundColor: "black",
    justifyContent: "space-between",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },

  textBase: {
    color: "white",
  },

  exercise: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },

  recordContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#cccccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 20,
  },

  record: {
    color: "black",
    fontWeight: "bold",
  },
  addButton: {
    marginRight: 20,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "white",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "white",
  },
  errorText: {
    color: "black",
    textAlign: "center",
    marginBottom: 8,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default PersonalRecords;
