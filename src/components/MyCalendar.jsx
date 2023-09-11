import { useEffect, useState } from 'react';
import moment from "moment"
import Calendar from 'react-calendar';
import "./MyCalendar.css";
import Nav1Popup from './Nav1Popup';
import BASE_URL from '../config';

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
                const response = await fetch(`${BASE_URL}/ipo/calendar?yyyy=${yy}&mm=${mm}`);

                if (!response.ok) {
                    throw new Error('Calendar Events Request failed');
                }

                const eventData = await response.json();

                if (eventData.resultCode !== '0000') {
                    alert(eventData.data);
                    return;
                }

                setEvents(eventData.data);

            } catch (error) {
                console.error('Error:', error);
                alert("잠시 후 다시 시도해 주세요");
            }
        };

        fetchEvents();
    }, [yy, mm]);

    const fetchDetails = async (ipoId) => {
        try {
            const response = await fetch(`${BASE_URL}/ipo?ipoId=${ipoId}`);

            if (!response.ok) {
                throw new Error('Details Request failed');
            }

            const detailData = await response.json();

            if (detailData.resultCode !== '0000') {
                alert(detailData.data);
                return;
            }

            setPopupEvent(detailData.data);

        } catch (error) {
            console.error('Error:', error);
            alert("잠시 후 다시 시도해 주세요");
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

    const handleNextClick = ({ activeStartDate }) => {
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