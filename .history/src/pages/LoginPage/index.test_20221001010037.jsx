import { render, screen } from "@testing-library/react";
import LoginPage from "./index";

describe("Login Page", () => {
  test("render successfully", () => {
    render(<LoginPage />);
    //name check
    const nameInpEl = screen.getByRole("textbox", { name: "Name" });
    expect(nameInpEl).toBeInTheDocument();
    
    //number check
    const numberInpEl = screen.getByRole("textbox", {
      name: /^Phone Number$/i,
    });
    expect(numberInpEl).toBeInTheDocument();
  });
});
