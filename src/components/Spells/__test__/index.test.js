import { fireEvent, render, screen } from "@testing-library/react";
import Spells from "../index";

import { BrowserRouter as Router } from "react-router-dom";

it("test case for render the header", async () => {
  render(
    <Router>
      <Spells />
    </Router>
  );
  const tableElement = screen.getByTestId("header");
  expect(tableElement).toBeInTheDocument();
});

it("test case for renders table header", async () => {
  render(
    <Router>
      <Spells />
    </Router>
  );
  const tableHeaderElement = screen.getByTestId("table-header");
  expect(tableHeaderElement).toBeInTheDocument();
});

it("test case for favourite renders button", async () => {
  render(
    <Router>
      <Spells />
    </Router>
  );
  const buttonElement = screen.getByTestId("fav-buttton");
  expect(buttonElement).toBeInTheDocument();
});

it("test case for renders table row", async () => {
  render(
    <Router>
      <Spells />
    </Router>
  );
  const rowElement = await screen.findByTestId("spell-item-0");
  expect(rowElement).toBeInTheDocument();
});

it("test case for adding and removing the favourites", async () => {
  render(
    <Router>
      <Spells />
    </Router>
  );
  const clickButton = screen.getByTestId("fav-buttton");
  fireEvent.click(clickButton);
  const favContainer = screen.queryByTestId("fav-container");
  expect(favContainer).toBeInTheDocument();
  fireEvent.click(clickButton);
  expect(favContainer).not.toBeInTheDocument();
});
