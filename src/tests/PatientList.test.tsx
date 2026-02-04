import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import PatientList from "../components/PatientList";
import { NotificationProvider } from "../context/NotificationContext";

vi.mock("../hooks/usePagination", () => ({
  usePagination: () => ({
    patients: [
      { id: "1", name: [{ given: ["John"], family: "Doe" }] },
      { id: "2", name: [{ given: ["Jane"], family: "Smith" }] },
    ],
    loading: false,
    page: 1,
    handlePageChange: vi.fn(),
    loadInitial: vi.fn(),
  }),
}));

describe("PatientList Component", () => {
  it("renders the list of patients from the hook", async () => {
    render(
      <NotificationProvider>
        <MemoryRouter>
          <PatientList />
        </MemoryRouter>
      </NotificationProvider>,
    );

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
    expect(screen.getByText(/ID: 1/i)).toBeInTheDocument();
  });

  it("displays pagination controls", () => {
    render(
      <NotificationProvider>
        <MemoryRouter>
          <PatientList />
        </MemoryRouter>
      </NotificationProvider>,
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
