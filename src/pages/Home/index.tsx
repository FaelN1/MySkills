import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  FlatList,
  StatusBar,
} from "react-native";

import { Button } from "../../components/Button";
import { SkillCard } from "../../components/SkillCard";

interface SkillData {
  id: string;
  name: string;
}

export default function Home() {
  const [newSkill, setNewSkill] = useState("");
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [greetings, setGreetings] = useState("");

  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill,
    };

    setMySkills((oldState) => [...oldState, data]);
    setNewSkill("");
  }

  function handleRemoveSkill(id: string) {
    setMySkills((oldState) => oldState.filter((skill) => skill.id !== id));
  }

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreetings("Good Morning");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreetings("Good Afternoon");
    } else {
      setGreetings("Good Night");
    }
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Welcome, Rafael</Text>
        <Text style={styles.greetings}>{greetings}</Text>
        <TextInput
          style={styles.input}
          value={newSkill}
          placeholder={"Qual a Skill?"}
          placeholderTextColor={"#555"}
          onChangeText={(text) => setNewSkill(text)}
          multiline={true}
        />

        <Button title={"Add"} onPress={handleAddNewSkill} />

        <Text style={[styles.title, { marginTop: 50 }]}>My Skills</Text>

        <FlatList
          data={mySkills}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SkillCard
              skill={item.name}
              onPress={() => handleRemoveSkill(item.id)}
            />
          )}
        />
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121015",
    paddingVertical: 70,
    paddingHorizontal: 30,
  },
  title: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#1F1e25",
    color: "#FFF",
    fontSize: 18,
    padding: 15,
    marginTop: 30,
    borderRadius: 10,
  },
  greetings: {
    color: "#FFF",
  },
});
