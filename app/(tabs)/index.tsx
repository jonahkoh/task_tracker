import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Task from '@/components/Task';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getAllTasks = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys(); //get all the title from storage
    const result = await AsyncStorage.multiGet(keys); //get all the due dates
    return result.map(([title,subtext]) => ({ title, subtext}));
  } catch (e) {
    console.error('Error retrieving task: ', e);
    return [];
  }
};

export default function Index() {
  //state to manage input values and task list
  const [taskItems, setTaskItems] = useState<{title:string;subtext:string}[]>([]);
  
  //load tasks from Async 
  useEffect(() =>{
    const fetchTasks = async () => {
      const storedTasks = await getAllTasks();
      setTaskItems(storedTasks);
    };

    fetchTasks();
  },[]);    //an empty dependency array --> only runs once when the component mounts

  const completeTask = async (index:number, title:string) => {
    try {
      await AsyncStorage.removeItem(title);  //remove from storage
      let itemsCopy = [...taskItems];   //copy current array of task
      itemsCopy.splice(index,1);       //remove the task we click on
      setTaskItems(itemsCopy);        //update the array
    } catch (e) {
      console.error('Error deleting task:', e)
    }
  }

  return (
    <View style={styles.container}>
      {/* Today's Task */}
      <Text style={styles.title}>Task List</Text>
      <ScrollView style={styles.scrollView}>
      <View style={styles.Wrapper}>
        <View style={styles.taskContainer}>
          {
            taskItems.map((item,index) => (
                <TouchableOpacity key={index} onPress={() => completeTask(index,item.title)}>
                  <Task title={item.title} subtext={item.subtext}/>
                </TouchableOpacity>
              ))
          }
         
        </View>
      </View>
      </ScrollView>
    </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
  },
  Wrapper: {
  },
  title:{
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    paddingBottom: 10,
  },
  text: {
    color: '#fff',
  },
  scrollView:{
    flexGrow: 1,      //Can scroll if content exceeds screen
    marginBottom: 130,
  },
  taskContainer: {
    flex: 1,
    width: 500,
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
