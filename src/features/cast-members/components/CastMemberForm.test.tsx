import { render } from "@testing-library/react";
import { CastMemberForm, Props as CastMemberFormProps } from "./CastMemberForm";
import { BrowserRouter } from "react-router-dom";

const Props: CastMemberFormProps = {
  castMember: {
    id: "1",
    name: "Test",
    type: 1,
    created_at: "2021-10-01T00:00:00.000000Z",
    updated_at: "2021-10-01T00:00:00.000000Z",
    deleted_at: "",
  },
  isLoading: false,
  isDisabled: false,
  handleSubmit: jest.fn(),
  handleChange: jest.fn(),
  children: "Create Cast Member",
};
describe("CastMemberForm Unit Tests", () => {
  it("should render cast member form correctly", () => {
    const { asFragment } = render(<CastMemberForm {...Props} />, {
      wrapper: BrowserRouter,
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render cast member form with loading state", () => {
    const { asFragment } = render(
      <CastMemberForm {...Props} isLoading={true} />,
      { wrapper: BrowserRouter }
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render cast member form with disabled state", () => {
    const { asFragment } = render(
      <CastMemberForm {...Props} isLoading={true} isDisabled={true} />,
      { wrapper: BrowserRouter }
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render cast member form without loading and disabled", () => {
    const { asFragment } = render(
      <CastMemberForm
        {...Props}
        isLoading={undefined}
        isDisabled={undefined}
      />,
      { wrapper: BrowserRouter }
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
