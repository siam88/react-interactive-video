import { render, screen } from "@testing-library/react";
import LoginPage from "./index";

describe("Login Page", () => {
  
  test("header checked successfully", () => {
    render(<LoginPage />);
    //title check
    const headerEl=screen.getByRole("heading",{level:2});
    expect(headerEl).toBeInTheDocument()
  });
  test("form checked successfully", () => {
    render(<LoginPage />);
       //form check
       const formEl=screen.getByRole("form")
       expect(formEl).toBeInTheDocument()
  });
  test("name checked successfully", () => {
    render(<LoginPage />);
     //name check
     const nameInpEl = screen.getByRole("textbox", { name: "Name" });
     expect(nameInpEl).toBeInTheDocument();
  });
  test("number checked successfully", () => {
    render(<LoginPage />);
     //number check
     const numberInpEl = screen.getByRole("textbox", {
        name: /^Phone Number$/i,
      });
    expect(numberInpEl).toBeInTheDocument();

  });
  test("t&C checked successfully", () => {
    render(<LoginPage />);
      //checkbox check
      const checkBoxEl = screen.getByRole("checkbox");
      expect(checkBoxEl).toBeInTheDocument();

      //label check
      const labelEl=screen.getByLabelText(/^I agree to terms and conditions$/i)
      expect(labelEl).toBeInTheDocument();
    });
  test("submit checked successfully", () => {
    render(<LoginPage />);
     //submit button check
     const submitBtnEl=screen.getByRole("button")
     expect(submitBtnEl).toBeInTheDocument()
  });
});
