import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import NewTaskForm from "../components/NewTaskForm";
import { CATEGORIES } from "../data";
import App from "../components/App";

test("calls the onTaskFormSubmit callback prop when the form is submitted", () => {
  const onTaskFormSubmit = jest.fn();
  render(
    <NewTaskForm categories={CATEGORIES} onTaskFormSubmit={onTaskFormSubmit} />
  );

  // Find the input fields and category dropdown
  const input = screen.queryByLabelText(/Details/);
  const select = screen.queryByLabelText(/Category/);

  // Ensure the input and select elements are in the document
  expect(input).toBeInTheDocument();
  expect(select).toBeInTheDocument();

  // Simulate user input
  fireEvent.change(input, {
    target: { value: "Pass the tests" },
  });

  fireEvent.change(select, {
    target: { value: "Code" },
  });

  // Submit the form
  const submitButton = screen.getByRole('button', { name: /Add task/i });
  expect(submitButton).toBeInTheDocument();  // Check if the submit button exists

  fireEvent.submit(submitButton);

  // Check if the callback was called with the correct arguments
  expect(onTaskFormSubmit).toHaveBeenCalledWith(
    expect.objectContaining({
      text: "Pass the tests",
      category: "Code",
    })
  );
});

test("adds a new item to the list when the form is submitted", () => {
  render(<App />);

  // Find the current count of 'Code' category tasks
  const codeCount = screen.queryAllByText(/Code/).length;

  // Find and fill out the form
  fireEvent.change(screen.queryByLabelText(/Details/), {
    target: { value: "Pass the tests" },
  });

  fireEvent.change(screen.queryByLabelText(/Category/), {
    target: { value: "Code" },
  });

  // Submit the form
  const submitButton = screen.getByRole('button', { name: /Add task/i });
  fireEvent.submit(submitButton);

  // Check if the task was added to the list
  expect(screen.queryByText(/Pass the tests/)).toBeInTheDocument();

  // Check if the number of 'Code' tasks has increased by 1
  expect(screen.queryAllByText(/Code/).length).toBe(codeCount + 1);
});
