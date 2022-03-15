import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import api from "../services/api";

export default function EventCard({ title, description, day, id, state }) {
  const { dispatchCalEvent, setSelectedEvent } = useContext(GlobalContext);
  const [stateCta, setStateCta] = useState("");

  useEffect(() => {
    setStateCta(state);
  }, [state]);

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      day,
      id,
    };

    if (stateCta === "retire") {
      api
        .delete(`scheduleLogs/${id}`)
        .then(
          dispatchCalEvent({
            type: "delete",
            payload: id,
          })
        )
        .catch((err) => {
          console.log(err);
        });
      setStateCta("unretired");
    } else {
      api
        .post("scheduleLogs", calendarEvent)
        .then((response) => {
          dispatchCalEvent({
            type: "push",
            payload: [response.data],
          });
        })
        .catch((err) => {
          console.log(err);
        });
      setStateCta("retired");
    }
  }

  function handleCardClick() {
    setSelectedEvent(id);
  }

  return (
    <div
      className="flex"
      {...(stateCta === "retire" && {
        onClick: handleCardClick,
        className: "cursor-pointer",
      })}
    >
      <form className="bg-white rounded-lg shadow-md w-full">
        <header className="bg-gray-100 px-4 py-2 flex justify-center items-center">
          <span className="">{title}</span>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <div className="flex">
              <span className="material-icons-outlined text-gray-400">
                bookmark_border
              </span>
              <p>{description}</p>
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
            data-testid="cta"
          >
            {stateCta}
          </button>
        </footer>
      </form>
    </div>
  );
}
