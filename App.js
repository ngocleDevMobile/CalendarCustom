/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal
} from 'react-native';
import Calendar from './src/component/CalendarComponent';
import moment from 'moment'


const App = () => {
  const [startDate, setStartDate] = useState(moment(new Date()).format('DD-MM-YYYY'));
  const [endDate, setEndDate] = useState(moment(new Date()).format('DD-MM-YYYY'));
  const [daySelect, setDateSelect] = useState(moment(new Date()).format('DD-MM-YYYY'));
  const [isVisible, setIsVisible] = useState(false);

  const getDate = (result) => {
    setTimeout(() => {
      setIsVisible(false);
      setStartDate(result.startingDays);
      setEndDate(result.endingDays);
      setDateSelect(result.daySelecteds)
    }, 500);
     
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={() => setIsVisible(true)} style={{backgroundColor: 'orange', padding: 20, borderRadius: 8}} >
        <Text>
          Select date
        </Text>
      </TouchableOpacity>
        <Text>{startDate}</Text>
        <Text>{endDate}</Text>
        <Text>{daySelect}</Text>
      <Modal visible={isVisible} animationType={'fade'} transparent={true}>
        <View style={{flex: 1}}>
          <TouchableOpacity style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.3)'}} onPress={() => setIsVisible(false)} />
            <Calendar style={{margin: 10}} getState={getDate} startDays={startDate} endDays={endDate} />
          <TouchableOpacity style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.3)'}} onPress={() => setIsVisible(false)} />
        </View>
      </Modal>
    </View>
  )
}



export default App;
