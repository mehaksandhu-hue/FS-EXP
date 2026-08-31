import PostStats from "./PostStats";
import { useState, useMemo, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import interactionPlugin from "@fullcalendar/react/interaction";

import "@fullcalendar/react/skeleton.css";
import "./App.css";

function App() {
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Instagram Post",
      start: "2026-08-20",
    },
    {
      id: "2",
      title: "LinkedIn Post",
      start: "2026-08-22",
    },
    {
      id: "3",
      title: "Facebook Post",
      start: "2026-08-25",
    },
  ]);

  const handleEventDrop = useCallback((info) => {
    setEvents((previousEvents) =>
      previousEvents.map((event) =>
        event.id === info.event.id
          ? { ...event, start: info.event.startStr }
          : event
      )
    );
  }, []);

  const calendarEvents = useMemo(() => events, [events]);

  return (
    <div className="app">
      <h1>📅 Social Media Post Scheduler</h1>
      <p>Drag and drop posts to reschedule them.</p>

      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          initialDate="2026-08-18"
          editable={true}
          events={calendarEvents}
          eventDrop={handleEventDrop}
          height="auto"
        />
      </div>

      <div className="info">
        💡 Drag a post to another date to reschedule it.
      </div>
    </div>
  );
}

export default App;
