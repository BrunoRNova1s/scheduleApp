import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import EventCard from "./EventCard";

export default function Sidebar() {
  const { schedulesCard, savedEventsLogs } = useContext(GlobalContext);

  return (
    <aside className="border p-5 w-64">
      <div className="flex flex-col gap-y-8 h-full overflow-y-scroll">
        {schedulesCard &&
          schedulesCard.map((schedule) => (
            <EventCard
              title={schedule.title}
              day={schedule.day}
              description={schedule.description}
              state={
                savedEventsLogs.some((saved) => saved.id === schedule.id)
                  ? "retire"
                  : "unretire"
              }
              key={schedule.id}
              id={schedule.id}
            />
          ))}
      </div>
    </aside>
  );
}
