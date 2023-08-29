import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function MyPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const fetchData = async () => {
    try {
      const formattedDate = selectedDate.toISOString().split('T')[0];

      console.log(formattedDate);

      //const response = await fetch(`/api/data?date=${formattedDate}`); // 서버에 날짜 전송
      const response = await fetch('./신청.json'); // 서버에 날짜 전송
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>청약 신청 조회</h1>
      <DatePicker selected={selectedDate} onChange={handleDateChange} />
      <button onClick={fetchData}>조회</button>
      <table>
        <thead>
          <tr>
            <th>신청</th>
            <th>ipo_id</th>
            <th>기업코드</th>
            <th>기업명</th>
            <th>청약기일</th>
            <th>납입기일</th>
            <th>환불일</th>
            <th>상장예정일</th>
            <th>확정발행가</th>
            <th>법인구분</th>
            <th>증권수량</th>
            <th>증자방법</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item) => (
              <tr key={item.ipoId}>
                <td>
                  <Link to={`/nav2/${item.ipoId}`}>신청</Link>
                </td><td>{item.ipoId}</td>
                <td>{item.corpCode}</td>
                <td>{item.corpName}</td>
                <td>{item.sbd}</td>
                <td>{item.pymd}</td>
                <td>{item.refund}</td>
                <td>{item.ipoDate}</td>
                <td>{item.slprc}</td>
                <td>{item.corpCls}</td>
                <td>{item.stkcnt}</td>
                <td>{item.capitalIncrease}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12">기간을 설정해주세요.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

}

export default MyPage;
