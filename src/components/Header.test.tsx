import { render } from "@testing-library/react";
import { Header } from "./Header";

describe("Header Unit Tests", () => {
  it("should render header correctly", () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });
});
