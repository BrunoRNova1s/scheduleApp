import React from "react";

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index) => {},
  dispatchCalEvent: ({ type, payload }) => {},
  savedEventsLogs: [],
  setSelectedEvent: () => {},
});

export default GlobalContext;
