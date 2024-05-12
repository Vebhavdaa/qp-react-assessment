import { render, fireEvent } from "@testing-library/react";
import NotesList from "./NotesList";

const mockList = [
  { id: 1, status: false, title: "Test Title 1", content: "Test Content 1" },
  { id: 2, status: true, title: "Test Title 2", content: "Test Content 2" },
];

const mockProps = {
  list: mockList,
  handleDelete: jest.fn(),
  handleEdit: jest.fn(),
  handleStatus: jest.fn(),
};

describe("NotesList component", () => {
  test("renders list items with correct data", () => {
    const { getByText } = render(<NotesList {...mockProps} />);
    expect(getByText("Test Title 1")).toBeInTheDocument();
    expect(getByText("Test Content 1")).toBeInTheDocument();
    expect(getByText("Test Title 2")).toBeInTheDocument();
    expect(getByText("Test Content 2")).toBeInTheDocument();
  });

  test("calls handleDelete function with correct id when delete button is clicked", () => {
    const { getAllByRole } = render(<NotesList {...mockProps} />);
    const deleteButtons = getAllByRole("button", { name: /delete/i });
    fireEvent.click(deleteButtons[0]);
    expect(mockProps.handleDelete).toHaveBeenCalledWith(1);
  });

  test("calls handleEdit function with correct id when edit button is clicked", () => {
    const { getAllByRole } = render(<NotesList {...mockProps} />);
    const editButtons = getAllByRole("button", { name: /edit/i });
    fireEvent.click(editButtons[0]);
    expect(mockProps.handleEdit).toHaveBeenCalledWith(1);
  });
});
