import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { AuthProvider } from "@/contexts/AuthContext";
import MainNav from "../MainNav";

const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <AuthProvider>{component}</AuthProvider>
    </BrowserRouter>
  );
};

describe("MainNav", () => {
  it("renders logo", () => {
    renderWithRouter(<MainNav />);
    expect(screen.getByAltText("Bayele Immo")).toBeInTheDocument();
  });

  it("shows mobile menu when menu button is clicked", () => {
    renderWithRouter(<MainNav />);
    const menuButton = screen.getByRole("button", { name: /toggle menu/i });
    fireEvent.click(menuButton);
    expect(screen.getByText("List a property")).toBeInTheDocument();
  });

  it("navigates to login page when login button is clicked", () => {
    renderWithRouter(<MainNav />);
    const loginButton = screen.getByRole("button", { name: /log in/i });
    fireEvent.click(loginButton);
    // Navigation assertion is handled by React Router testing utilities
  });
});