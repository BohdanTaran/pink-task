import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import PatientDetail from "../components/PatientDetail";
import { NotificationProvider } from "../context/NotificationContext";

vi.mock("fhirclient", () => ({
  default: {
    client: () => ({
      request: vi.fn().mockResolvedValue({
        id: "789",
        name: [{ given: ["Chrisjen"], family: "Avasarala" }],
        gender: "female",
        birthDate: "1950-12-07",
        address: [
          {
            line: ["UN Headquarters"],
            city: "New York",
            state: "NY",
            postalCode: "10017",
          },
        ],
      }),
    }),
  },
}));

describe("PatientDetail Component", () => {
  it("renders patient data from router params", async () => {
    render(
      <NotificationProvider>
        <MemoryRouter initialEntries={["/patient/789"]}>
          <Routes>
            <Route path="/patient/:id" element={<PatientDetail />} />
          </Routes>
        </MemoryRouter>
      </NotificationProvider>,
    );

    const name = await screen.findByText(/Chrisjen Avasarala/i);
    expect(name).toBeInTheDocument();
    expect(screen.getByText(/female/i)).toBeInTheDocument();
    expect(screen.getByText(/New York/i)).toBeInTheDocument();
  });
});
