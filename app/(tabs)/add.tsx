import { Text, View, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';

const storeData = async (title:string,dueDate:string) => {
  try {
    await AsyncStorage.setItem(title,dueDate);
    console.log('Task saved successfully');
  } catch (e) {
    console.error('Error saving task:', e)
  }
};


export default function AboutScreen() {
  //state to manage input values and task list  
  const [taskTitle, setTaskTitle] = useState<String>('');              //track title input
  const [taskSubtext, setTaskSubtext] = useState<String>('');         //track due date input
    const [taskItems, setTaskItems] = useState<{title:string;subtext:string}[]>([]);

 //function to add task
  const handleAddTask = async () => {
    if (taskTitle.trim() && taskSubtext.trim()) {
      const newTask = { title: taskTitle, subtext: taskSubtext};
      await storeData(taskTitle,taskSubtext);       //store data 
      setTaskItems([...taskItems, newTask]);       //add to state
      setTaskTitle('');       //reset input
      setTaskSubtext('');
    }else{
      console.warn('Invalid task input.')
    }
  }
  return (
      <KeyboardAvoidingView style={styles.writeTaskWrapper}>   
      {/* Input for Task Title */}                                               
      <TextInput 
        style={styles.input}
        placeholder={'Enter Task Title'} 
        value={taskTitle} 
        onChangeText={text => setTaskTitle(text)}
      /> 

      {/* Input for Due Date */}                                               
      <TextInput 
          style={styles.input}
          placeholder={'Enter Due Date'} 
          value={taskSubtext} 
          onChangeText={text => setTaskSubtext(text)}
      /> 
 

      {/* Add Button */} 
      <TouchableOpacity onPress={() => handleAddTask()}>   {/*prevents virtual keyboard blocking by pushing items up*/}                                      
        <View style={styles.addWrapper}>
          <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
  writeTaskWrapper: {
    position: 'absolute', //Able to place it anyway we want on the screen
    bottom: 60,
    left: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',    //push textbar right, + icon left
    alignItems: 'center',
  },                                     
  input:{
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper:{
    marginRight: 200,
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText:{
  },
});
