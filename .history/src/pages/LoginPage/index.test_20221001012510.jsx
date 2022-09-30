import { render, screen } from "@testing-library/react";
import LoginPage from "./index";

describe("Login Page", () => {
  test("render successfully", () => {
    render(<LoginPage />);
    //title check
    const headerEl=screen.getByRole("heading",{level:2});
    expect(headerEl).toBeInTheDocument()
    //form check
    const formEl=screen.getByRole("form")
    expect(formEl).toBeInTheDocument()

    //name check
    const nameInpEl = screen.getByRole("textbox", { name: "Name" });
    expect(nameInpEl).toBeInTheDocument();
    
    //number check
    const numberInpEl = screen.getByRole("textbox", {
      name: /^Phone Number$/i,
    });
    expect(numberInpEl).toBeInTheDocument();
    //checkbox check
    const checkBoxEl = screen.getByRole("checkbox");
    expect(checkBoxEl).toBeInTheDocument();

    //submit button check
    const submitBtnEl=screen.getByRole("button")
    expect(submitBtnEl).toBeInTheDocument()
  
  });
  test("header checked successfully", () => {
    render(<LoginPage />);
    //title check
    const headerEl=screen.getByRole("heading",{level:2});
    expect(headerEl).toBeInTheDocument()
   
  
  });
});
