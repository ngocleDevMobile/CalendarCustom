import React, {Component, useState, useEffect} from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';

import {Calendar, LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales.vn = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    'Th.1',
    'Th.2',
    'Th.3',
    'Th.4',
    'Th.5',
    'Th.6',
    'Th.7',
    'Th.8',
    'Th.9',
    'Th.10',
    'Th.11',
    'Th.12 ',
  ],
  dayNames: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
  dayNamesShort: ['CN', 'T.2', 'T.3', 'T.4', 'T.5', 'T.6', 'T.7'],
  today: "Hôm nay'HN",
};
LocaleConfig.defaultLocale = 'vn';
const Calende = ({getState, startDays, endDays}) => {
  const [startDay, setStartDay] = useState( moment(startDays).format('YYYY-MM-DD'));
  const [endDay, setEndtDay] = useState(moment(endDays).format('YYYY-MM-DD'));
  const [daySelect, setDateSelect] = useState(
    moment(daySelect).format('YYYY-MM-DD'),
  );
  const [marked, setMarked] = useState({});
  const [currentMonth, setCurrentMonth] = useState(
    moment(startDays).format('YYYY-MM'),
  );
  useEffect(() => {
    renderDataForMarker(startDay, endDay);
  }, []);
  const onDayPress = (day) => {
    //let that = this;
    if (startDay == '') {
      setStartDay(moment(day.dateString).format('YYYY-MM-DD'));
      setMarked({
        [moment(day.dateString).format('YYYY-MM-DD')]: {
          startDay: true,
          selected: true,
          color: '#143678',
        },
      });
      setEndtDay('');
    }
    if (startDay != '') {
      if (endDay != '') {
        setStartDay(moment(day.dateString).format('YYYY-MM-DD'));
        setMarked({
          [moment(day.dateString).format('YYYY-MM-DD')]: {
            startingDay: true,
            selected: true,
            color: '#143678',
          },
        });
        setEndtDay('');
      } else {
        setEndtDay(moment(day.dateString).format('YYYY-MM-DD'));

        if (startDay > day.dateString) {
          setStartDay(moment(day.dateString).format('YYYY-MM-DD'));
          setMarked({
            [moment(day.dateString).format('YYYY-MM-DD')]: {
              startingDay: true,
              selected: true,
              color: '#143678',
            },
          });
          setEndtDay('');
        } else {
          selectedDay(startDay, moment(day.dateString).format('YYYY-MM-DD'));
        }
      }
    }
  };

  const renderDataForMarker = (startingDays, endingDays) => {
    let nextDay = [];
    let startingDate;
    let stopDate;
    let obj;
    startingDate = moment(startingDays);
    stopDate = moment(endingDays);

    if (startingDate > stopDate) {
      while (stopDate <= startingDate) {
        nextDay.push(moment(stopDate).format('YYYY-MM-DD'));
        stopDate = moment(stopDate).add(1, 'days');
      }
      obj = nextDay.reduce(
        (c, v) =>
          Object.assign(c, {
            [v]:
              v == moment(startingDays).format('YYYY-MM-DD')
                ? {endingDay: true, selected: true, color: '#143678'}
                : v == moment(endingDays).format('YYYY-MM-DD')
                ? {startingDay: true, selected: true, color: '#143678'}
                : {
                    selected: true,
                    marked: true,
                    color: '#143678',
                  },
          }),
        {},
      );
    } else {
      while (startingDate <= stopDate) {
        nextDay.push(moment(startingDate).format('YYYY-MM-DD'));
        startingDate = moment(startingDate).add(1, 'days');
      }
      obj = nextDay.reduce(
        (c, v) =>
          Object.assign(c, {
            [v]:
              nextDay.length == 1
                ? {
                    selected: true,
                    marked: true,
                    color: '#143678',
                  }
                : v == moment(startingDays).format('YYYY-MM-DD')
                ? {
                    startingDay: true,
                    selected: true,
                    color: '#143678',
                  }
                : v == moment(endingDays).format('YYYY-MM-DD')
                ? {
                    endingDay: true,
                    selected: true,
                    color: '#143678',
                  }
                : {
                    selected: true,
                    marked: true,
                    color: '#143678',
                  },
          }),
        {},
      );
    }
    setMarked(obj);
  };

  const selectedDay = (startingDay, endingDay, thisIsOnChangMonth) => {
    renderDataForMarker(startingDay, endingDay);
    if (thisIsOnChangMonth == null) {
      startingDay > endingDay
        ? response(
            moment(endingDay).format('YYYYMMDD'),
            moment(startingDay).format('YYYYMMDD'),
          )
        : response(
            moment(startingDay).format('YYYYMMDD'),
            moment(endingDay).format('YYYYMMDD'),
          );
    }
  };

  const followDay = () => {
    const startOfDay = moment(new Date()).format('YYYY-MM-DD');
    const endOfDay = moment(new Date()).format('YYYY-MM-DD');
    setCurrentMonth(moment(moment.timestamp).format('YYYY-MM'));
    setStartDay(startOfDay);
    setEndtDay(endOfDay);
    selectedDay(startOfDay, endOfDay);
  };

  const thisMonth = () => {
    let currentMonths = currentMonth;
    let startOfMonths = currentMonth + '-01';
    let endOfMonths =
      currentMonth + '-' + moment(currentMonths, 'YYYY-MM').daysInMonth();
    setStartDay(startOfMonths);
    setEndtDay(endOfMonths);
    selectedDay(startOfMonths, endOfMonths);
  };

  const thisWeek = () => {
    let monday =
      currentMonth !=
      moment(moment(startDay, 'YYYY-MM-DD').clone().weekday(0)).format(
        'YYYY-MM',
      )
        ? moment(moment(startDay, 'YYYY-MM-DD').clone().weekday(0)).format(
            'YYYY-MM',
          ) +
          moment(moment(startDay, 'YYYY-MM-DD').clone().weekday(0)).format(
            '-DD',
          )
        : currentMonth +
          moment(moment(startDay, 'YYYY-MM-DD').clone().weekday(0)).format(
            '-DD',
          );

    let betweenday =
      currentMonth !=
      moment(moment(startDay, 'YYYY-MM-DD').clone().weekday(4)).format(
        'YYYY-MM',
      )
        ? moment(moment(startDay, 'YYYY-MM-DD').clone().weekday(4)).format(
            'YYYY-MM',
          ) +
          moment(moment(startDay, 'YYYY-MM-DD').clone().weekday(4)).format(
            '-DD',
          )
        : currentMonth +
          moment(moment(startDay, 'YYYY-MM-DD').clone().weekday(4)).format(
            '-DD',
          );

    let sunday =
      currentMonth !=
      moment(moment(startDay, 'YYYY-MM-DD').clone().weekday(6)).format(
        'YYYY-MM',
      )
        ? moment(moment(startDay, 'YYYY-MM-DD').clone().weekday(6)).format(
            'YYYY-MM',
          ) +
          moment(moment(startDay, 'YYYY-MM-DD').clone().weekday(6)).format(
            '-DD',
          )
        : currentMonth +
          moment(moment(startDay, 'YYYY-MM-DD').clone().weekday(6)).format(
            '-DD',
          );
    setCurrentMonth(moment(betweenday).format('YYYY-MM'));
    setStartDay(monday);
    setEndtDay(sunday);
    selectedDay(monday, sunday);
  };

  const onMonthChange = (month) => {
    let currentMonths = currentMonth;
    currentMonths = moment(month.timestamp).format('YYYY-MM');

    setCurrentMonth(currentMonths);
    if (currentMonth != moment(month.timestamp).format('YYYY-MM')) {
      setStartDay(currentMonths + moment(startDay).format('-DD'));
      setEndtDay(currentMonths + moment(startDay).format('-DD'));

      selectedDay(
        currentMonths + moment(startDay).format('-DD'),
        currentMonths + moment(startDay).format('-DD'),
        'thisIsOnChangMonth',
      );
    } else {
      setStartDay(currentMonths + moment(startDay).format('-DD'));
      setEndtDay(currentMonths + moment(endDay).format('-DD'));

      selectedDay(
        currentMonths + moment(startDay).format('-DD'),
        currentMonths + moment(endDay).format('-DD'),
        'thisIsOnChangMonth',
      );
    }
  };

  const response = (startingDay, endingDay) => {
    // console.log(startingDay + '*|*' + endingDay);
    const daySelected =
      startingDay > endingDay
        ? moment(endingDay).format('DD.MM.YYYY') +
          ' - ' +
          moment(startingDay).format('DD.MM.YYYY')
        : startingDay == endingDay
        ? moment(startingDay).format('DD.MM.YYYY')
        : moment(startingDay).format('DD.MM.YYYY') +
          ' - ' +
          moment(endingDay).format('DD.MM.YYYY');

    setStartDay(startingDay);
    setEndtDay(endingDay);
    //setDateSelect(daySelected);

    getState({
      startingDays: startingDay,
      endingDays: endingDay,
      daySelecteds: daySelected,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.box_button}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            followDay();
          }}>
          <Text style={{color: 'gray'}}>Hôm nay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => thisWeek()}>
          <Text style={{color: 'gray'}}>Tuần</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => thisMonth()}>
          <Text style={{color: 'gray'}}>Tháng</Text>
        </TouchableOpacity>
        {/* <Button height={50} center flex >
          <Text color={'#fff'}>Chọn</Text>
        </Button> */}
      </View>
      <Calendar
        // style={styles.calendar}
        //maxDate={moment(new Date()).format("YYYY-MM-DD")}
        monthFormat={'MMMM - yyyy'}
        onDayPress={onDayPress}
        //onDayLongPress={this.onDayPress2}
        //onMonthChange={(month) => console.log('â' + month)}
        onMonthChange={(month) => {
          onMonthChange(month);
        }}
        hideDayNames={false}
        showWeekNumbers={false}
        hideExtraDays={false}
        firstDay={0}
        current={currentMonth}
        //current={this.state.currentMonth + moment(this.state.startingDay).format('-DD')}
        //markedDates={this.state.marked}
        markedDates={marked}
        markingType={'period'}
        style={{
          borderColor: 'gray',
          height: 350,
          width: Dimensions.get('screen').width,
        }}
        theme={{
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: 'orange',
          monthTextColor: 'blue',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'column',
    // marginTop: Platform.OS === 'ios' ? 160 : 140,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 5,
    margin: 10
  },
  box_button: {
    height: 50,
    backgroundColor: 'orange',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
    
  },
  button: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'white',
    borderRadius: 8
  },
});

export default Calende;
