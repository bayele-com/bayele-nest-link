import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "../Footer";

describe("Footer", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
  });

  it("renders company links", () => {
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("renders payment methods", () => {
    expect(screen.getByText("Payment Methods")).toBeInTheDocument();
    expect(screen.getByText("• MTN Mobile Money")).toBeInTheDocument();
    expect(screen.getByText("• Orange Money")).toBeInTheDocument();
  });

  it("renders social links", () => {
    expect(screen.getByText("Connect with us")).toBeInTheDocument();
  });

  it("renders copyright notice with current year", () => {
    const currentYear = new Date().getFullYear();
    expect(screen.getByText((content) => content.includes(currentYear.toString()))).toBeInTheDocument();
  });
});