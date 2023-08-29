import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Nav1Popup from './Nav1Popup';
import moment from "moment"

const styles = {
    dot: {
        height: "8px",
        width: "8px",
        backgroundColor: "#f87171",
        borderRadius: "50%",
        display: "flex",
        marginLeft: "1px",
    }
};

function MyCalendar() {
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [popupEvent, setPopupEvent] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('/api/ipo/list'); //  ./events.json RestAPI경로
                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }
                console.log('response ok' + eventData);
                const eventData = await response.json();
                setEvents(eventData);
                
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    }

    const handleEventClick = (date) => {
        const eventForDate = events.find(event => event.date === date.toISOString().split('T')[0]);
        if (eventForDate) {
            setPopupEvent(eventForDate);
        } else {
            setPopupEvent(null);
        }
    }

    const closePopup = () => {
        setPopupEvent(null);
    }

    return (
        <div>
            <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                formatDay={(locale, date) => moment(date).format("DD")}
                minDetail="month"
                maxDetail="month"
                navigationLabel={null}
                showNeighboringMonth={false}
                className="mx-auto w-full text-sm border-b"
                tileContent={({ date }) => {
                    const eventForDate = events.find(event => event.date === date.toISOString().split('T')[0]);
                    if (eventForDate) {
                        return <div style={styles.dot}></div>;
                    }
                    return null;
                }}
                onClickDay={handleEventClick}
            />
            <Nav1Popup event={popupEvent} isVisible={!!popupEvent} onClose={closePopup} />
        </div>
    );
}

export default MyCalendar;