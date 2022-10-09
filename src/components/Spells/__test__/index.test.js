import { fireEvent, render, screen } from "@testing-library/react";
import Spells from "../index";

import { BrowserRouter as Router } from "react-router-dom";

it("render the header", async () => {
  render(
    <Router>
      <Spells />
    </Router>
  );
  const tableElement = screen.getByTestId("header");
  expect(tableElement).toBeInTheDocument();
});

it("renders table header", async () => {
  render(
    <Router>
      <Spells />
    </Router>
  );
  const tableHeaderElement = screen.getByTestId("table-header");
  expect(tableHeaderElement).toBeInTheDocument();
});

it("renders button", async () => {
  render(
    <Router>
      <Spells />
    </Router>
  );
  const buttonElement = screen.getByTestId("fav-buttton");
  expect(buttonElement).toBeInTheDocument();
});

it("renders table row", async () => {
  render(
    <Router>
      <Spells />
    </Router>
  );
  const rowElement = await screen.findByTestId("spell-item-0");
  expect(rowElement).toBeInTheDocument();
});

it("check items", async () => {
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
