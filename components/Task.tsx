import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type TaskProps = {
    title:string;
    subtext:string;
}

const Task: React.FC<TaskProps> = ({ title, subtext }) => {
    return (
        <View style={styles.item}>
            <View style={styles.text}>
                <View style={styles.square}></View>
                    <Text style={styles.titleText}>Title: {title}</Text>
                    <Text style={styles.subtext}>Due Date: {subtext}</Text>
                
            </View>
        </View>
            
        
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',   
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    text: {
        flexDirection: 'column',   
        alignItems: 'flex-start',
        flexWrap: 'wrap',    //If sentences gets too long, go to the next line
        
    },
    subtext: {
        
        
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    square: {
        width: 24,              
        height: 24,
        backgroundColor: '#0000FF',
        opacity: 0.4,
        borderRadius:5,
        marginRight: 15,

    },

});

export default Task;

