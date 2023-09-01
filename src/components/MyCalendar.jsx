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
    const [mm, setmm] = useState(String(selectedDate.getMonth() + 1).padStart(2, '0'));

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`https://5674dead-9b15-43f4-9eb4-21debfa1c2be.mock.pstmn.io/ipo/calendar?yyyy=${yy}&mm=${mm}`);
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
    
    const fetchDetails = async (ipoId) => {
        try {
            const response = await fetch(`https://5674dead-9b15-43f4-9eb4-21debfa1c2be.mock.pstmn.io/ipo/list?ipoId=${ipoId}`);

            if (!response.ok){
                throw new Error('Failed to fetch detail');
            }
            const detailData = await response.json();
            setPopupEvent(detailData.data.ipo[0]);
        } catch (error) {
            console.error('Error fetching Detail:', error);
        }
    }
    
    const handleDateChange = (date) => {
        setSelectedDate(date);
    }

    const handleEventClick = (date) => {
        const eventForDate = events.find(event => {
            const sbd = new Date(event.sbd)
            return sbd.getDate() === date.getDate();
        });
        if (eventForDate) {
            fetchDetails(eventForDate.ipoId);
        } else {
            setPopupEvent(null);
        }
    }

    const handleNextClick = ({activeStartDate}) => {
        setyy(activeStartDate.getFullYear());
        setmm(String(activeStartDate.getMonth() + 1).padStart(2, '0'));
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