import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
// Import EncryptedStorage for secure data handling
import EncryptedStorage from "react-native-encrypted-storage";
import Note from "./components/Note";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TRootStackParamList } from "./App";

export interface INote {
  id: string; // Added an id property for unique identification
  title: string;
  text: string;
}

interface IState {
  notes: INote[];
  newNoteTitle: string;
  newNoteText: string; // Renamed for consistency
}

type TProps = NativeStackScreenProps<TRootStackParamList, "Notes">;

export default class Notes extends Component<TProps, IState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      notes: [],
      newNoteTitle: "",
      newNoteText: "",
    };
  }

  // Fetch stored notes on component mount
  async componentDidMount() {
    await this.getStoredNotes();
  }

  // Store notes before component unmounts for data persistence
  async componentWillUnmount() {
    await this.storeNotes();
  }

  // Retrieve notes from encrypted storage
  private async getStoredNotes() {
    try {
      const value = await EncryptedStorage.getItem("notes");
      if (value) {
        this.setState({ notes: JSON.parse(value) });
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load notes.");
      console.error("Error reading notes from storage:", error);
    }
  }

  // Store notes into encrypted storage
  private async storeNotes() {
    try {
      const jsonValue = JSON.stringify(this.state.notes);
      await EncryptedStorage.setItem("notes", jsonValue);
    } catch (error) {
      console.error("Error storing notes:", error);
    }
  }

  // Handle changes to inputs and add a new note to the state
  private onNoteTitleChange = (value: string) =>
    this.setState({ newNoteTitle: value });
  private onNoteTextChange = (value: string) =>
    this.setState({ newNoteText: value });

  private addNote = () => {
    const { newNoteTitle, newNoteText, notes } = this.state;
    if (!newNoteTitle || !newNoteText) {
      Alert.alert("Error", "Title and text cannot be empty.");
      return;
    }

    // Create a new note with a unique identifier
    const newNote = {
      id: Date.now().toString(),
      title: newNoteTitle,
      text: newNoteText,
    };
    this.setState({
      notes: [...notes, newNote],
      newNoteTitle: "",
      newNoteText: "",
    });
  };

  public render() {
    return (
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.container}>
            <Text style={styles.title}>Math Notes</Text>
            <TextInput
              style={styles.input}
              value={this.state.newNoteTitle}
              onChangeText={this.onNoteTitleChange}
              placeholder="Enter note title"
            />
            <TextInput
              style={styles.input}
              value={this.state.newNoteText}
              onChangeText={this.onNoteTextChange}
              placeholder="Enter note text"
            />
            <Button title="Add Note" onPress={this.addNote} />
            {this.state.notes.map((note) => (
              <Note key={note.id} title={note.title} text={note.text} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

/*
Enhancements Overview:
- Introduced an `id` field for the `INote` interface to uniquely identify each note, facilitating operations like updates or deletions.
- Renamed `newNoteEquation` to `newNoteText` for consistency and clarity across the component's state.
- Replaced AsyncStorage with EncryptedStorage to enhance the security of stored data. EncryptedStorage encrypts the notes before storing them locally, protecting sensitive information from unauthorized access.
- Implemented error handling in both data retrieval and storage methods, ensuring robustness and reliability. Alert dialogs inform the user of issues while detailed errors are logged for debugging.
- Simplified the input handling methods (`onNoteTitleChange` and `onNoteTextChange`) for cleaner code.
- Notes are now created with a unique identifier (`id`), generated from the current timestamp converted to a string, allowing for future enhancements like note editing or deletion.
- Updated the UI to include rounded corners for input fields and a consistent style for better user experience.
*/
