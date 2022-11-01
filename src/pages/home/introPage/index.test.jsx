/**
 * Static content should be fixed as it is
 * 
 * */
import { screen, render } from "@testing-library/react";
import IntroPage from "./index";

describe("IntroPage Render successfully", () => {
  describe("static content", () => {
    test("instruction message 1 title renders correctly", () => {
      render(<IntroPage />);
      const linkElement = screen.getByText("হটস্পটে ক্লিক করে");
      expect(linkElement).toBeInTheDocument();
    });
    test("instruction message 1 description renders correctly", () => {
      render(<IntroPage />);
      const linkElement = screen.getByText("জিতে নিন তামিমের সিগনেচারসহ ব্যাট");
      expect(linkElement).toBeInTheDocument();
    });
    test.skip("instruction message 2 title renders correctly", () => {
      render(<IntroPage />);
      const linkElement = screen.getByText("হটস্পটে ক্লিক করে");
      expect(linkElement).toBeInTheDocument();
    });
    test.skip("instruction message 2 description renders correctly", () => {
      render(<IntroPage />);
      const linkElement = screen.getByText("জিতে নিন তামিমের সিগনেচারসহ ব্যাট");
      expect(linkElement).toBeInTheDocument();
    });
  });
});
