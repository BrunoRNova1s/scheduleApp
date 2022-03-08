import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";
import EventCard from "./EventCard.jsx";

test("on initial render, the button is unretire, and clicking is retire", () => {
  render(
    <EventCard
      sender={{ state: "unretire"}}
      receiver={{ state: "unretire"}}
    />
  );

  const element = screen.getByTestId('cta');
    
  userEvent.click(element);
  expect(element).toHaveTextContent(/retire/i)
});
