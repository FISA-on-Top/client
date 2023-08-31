import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import "./MyCalendar.css";
//import 'react-calendar/dist/Calendar.css';
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
        whiteSpace: "nowrap",
    }
};

function MyCalendar() {
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [popupEvent, setPopupEvent] = useState(null);
    const [yy, setyy] = useState(selectedDate.getFullYear());
    const [mm, setmm] = useState(selectedDate.getMonth() + 1);

    useEffect(() => {
        const fetchEvents = async () => {
            console.log("주소: "+`https://5674dead-9b15-43f4-9eb4-21debfa1c2be.mock.pstmn.io/ipo/calendar/yy=${yy}&mm=${mm}`);
            try {
                const response = await fetch(`https://5674dead-9b15-43f4-9eb4-21debfa1c2be.mock.pstmn.io/ipo/calendar/yy=${yy}&mm=${mm}`);
                //const response = await fetch('http://43.201.20.90/api/ipo/list');
                // const response = await fetch('https://5674dead-9b15-43f4-9eb4-21debfa1c2be.mock.pstmn.io/api/ipo/list');
    
                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }
                const eventData = await response.json();
                setEvents(eventData.data.ipo);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        
        fetchEvents();
    }, [yy, mm]);
    
    
    const handleDateChange = (date) => {
        setSelectedDate(date);
    }

    const handleEventClick = (date) => {
        const eventForDate = events.find(event => {
            const ipoDate = new Date(event.ipoDate)
            return ipoDate.getDate() === date.getDate();
        });
        if (eventForDate) {
            setPopupEvent(eventForDate);
        } else {
            setPopupEvent(null);
        }
    }

    const handleNextClick = ({activeStartDate}) => {
        setyy(activeStartDate.getFullYear());
        setmm((activeStartDate.getMonth() + 1));
    }

    const closePopup = () => {
        setPopupEvent(null);
    }

    return (
        <div>
            <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                calendarType="US"
                formatDay={(locale, date) => moment(date).format("D")}
                minDetail="month"
                maxDetail="month"
                navigationLabel={null}
                showNeighboringMonth={false}
                className="mx-auto w-full text-sm border-b"
                tileContent={({ date }) => {
                    const eventForDate = events.find(event => {
                        const ipoDate = new Date(event.sbd);
                        return ipoDate.getDate() === date.getDate();
                    });
                    if (eventForDate) {
                        return (<div style={styles.dot}>
                            {eventForDate.corpName}
                        </div>);
                    }
                    return null;
                }}
                onClickDay={handleEventClick}
                prevLabel="-"
                nextLabel="+"
                prev2Label={null}
                next2Label={null}
                onActiveStartDateChange={handleNextClick}
                
            />
            <Nav1Popup event={popupEvent} isVisible={!!popupEvent} onClose={closePopup} />
        </div>
    );
}

export default MyCalendar;