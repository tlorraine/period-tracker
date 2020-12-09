import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import CreateCalendarEvent from './CreateCalendarEvent';
import useCalendarEvents from '../../hooks/use-calendar-events';
import { Typography, Paper, CircularProgress } from '@material-ui/core';

import ShowCalendarEvent from './ShowCalendarEvent';

const localizer = momentLocalizer(moment);

moment.locale('ko', {
  week: {
    dow: 1,
    doy: 1,
  },
});

const CalendarScreen = () => {
  const [open, setOpen] = useState(false);
  const calendarEvents = useCalendarEvents();

  const handleClose = () => {
    setOpen(false);
  };

  return !calendarEvents ? (
    <CircularProgress/>
  ) : (
    <div>
      <Paper style={{ margin: 100 }}>
        <Typography variant="h1" color="secondary">
          My Calendar
        </Typography>
        <Calendar
          events={calendarEvents.map((calendarEvent) => ({
            title: 'Period',
            start: new Date(calendarEvent.id),
            end: new Date(calendarEvent.id),
            allDay: true,
          }))}
          localizer={localizer}
          views={['month', 'day']}
          showMultiDayTimes
          onSelecting={(event) => {
            console.log('hello world');
          }}
          onSelectEvent={(event) => {
            setOpen(true);
            console.log('onselectevent');
          }}
          eventPropGetter={(event, start, end, isSelected) => ({
            className: 'xxxx',
            style: { backgroundColor: '#ffcdd2' }
          })}
          style={{ height: 500 }}
        />
        <ShowCalendarEvent isOpen={open} handleClose={handleClose}/>
        <CreateCalendarEvent/>
      </Paper>
    </div>
  );
};

export default CalendarScreen;
