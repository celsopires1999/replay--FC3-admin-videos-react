// import { render } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";
import { Layout } from "./Layout";

describe("Layout Unit Tests", () => {
  it("should render layout correctly", () => {
    const { asFragment } = renderWithProviders(
      <Layout>
        <div>Test</div>
      </Layout>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
