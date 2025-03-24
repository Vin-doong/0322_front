import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Header from "../components/include/Header";
import "./Schedule.css";

const Schedule = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([
    { title: "회의", date: "2025-03-15" },
    { title: "건강검진", date: "2025-03-20" },
  ]);
  
  // 추가 보안 체크 (이중 보호)
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      // 알림 메시지 없이 리다이렉트만 수행
      navigate('/login');
    }
  }, [navigate]);
  const handleDateClick = (info) => {
    const title = prompt("일정을 입력하세요:");
    if (title) {
      setEvents([...events, { title, date: info.dateStr }]);
    }
  };

  return (
    <div className="schedule-container">
      <Header />
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          height="100vh"  // 캘린더가 화면 가득 차도록 설정
          contentHeight="auto"
          expandRows={true} // 행 높이 자동 확장
        />
      </div>
    </div>
  );
};

export default Schedule;
