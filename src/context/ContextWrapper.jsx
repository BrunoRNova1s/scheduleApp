import React, { useState, useEffect, useReducer, useMemo } from "react";
import GlobalContext from "./GlobalContext";
import api from "../services/api";
import dayjs from "dayjs";

function savedEventsLogsReducer(state, { type, payload }) {
  switch (type) {
    case "get":
      return [...payload];
    case "push":
      return [...state, ...payload];
    case "delete":
      return state.filter((evt) => evt.id !== payload);
    default:
      throw new Error();
  }
}

export default function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [schedulesCard, setSchedulesCard] = useState([]);
  const [savedEventsLogs, dispatchCalEvent] = useReducer(
    savedEventsLogsReducer,
    []
  );
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    api
      .get("/schedules")
      .then((response) => {
        setSchedulesCard(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .get("/scheduleLogs")
      .then((response) => {
        dispatchCalEvent({ type: "get", payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        savedEventsLogs,
        schedulesCard,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
