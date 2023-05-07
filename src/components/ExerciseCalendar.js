import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Full_API } from '../constants';
import moment from 'moment';

const ExerciseCalendar = () => {
  const localizer = momentLocalizer(moment);
  const [session, setSession] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const getTrainings = () => {
    fetch(Full_API)
      .then(response => response.json())
      .then(trainings => {
        return setSession(
          trainings.map((training, i) => ({
            id: i,
            title: training.activity + '<br />' + training.customer.firstname + ' ' + training.customer.lastname + '<br />' + moment.utc(training.date).format('HH:mm'), // Convert to UTC and format
            start: moment.utc(training.date).toDate(), 
            end: moment.utc(training.date).add(training.duration, 'minutes').toDate(), 
          }))
        );
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getTrainings();
  }, []);

  const eventStyleGetter = () => {
    return {
      style: {
        width: '180px',
      },
    };
  };

  const eventHtml = ({ event }) => {
    return (
      <div>
        <span>{event.title.split('<br />')[0]}</span>
        <br />
        <span>{event.title.split('<br />')[1]}</span>
        <br />
        <span>{event.title.split('<br />')[2]}</span>
      </div>
    );
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  }

  return (
    <div>
      {selectedEvent && (
        <div>
          <h2>{moment(selectedEvent.start).format('dddd, MMMM Do YYYY')}</h2>
          <ul>
            {session
              .filter(event => moment(event.start).isSame(selectedEvent.start, 'day'))
              .map(event => (
                <li key={event.id}>
                  <h3>{event.title.split('<br />')[0]}</h3>
                    {event.title.split('<br />')[1]}<br />
                    {event.title.split('<br />')[2]}
                 
                </li>
              ))}
          </ul>
        </div>
      )}
      <Calendar
        localizer={localizer}
        events={session}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        components={{ event: eventHtml }}
        style={{
          height: '800px',
          width: '90%',
          margin: 'auto',
        }}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
};

export default ExerciseCalendar;