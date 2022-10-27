import { render } from "@testing-library/react";
import { CategoryForm, Props as CategoryFormProps } from "./CategoryForm";
import { BrowserRouter } from "react-router-dom";
import { Category } from "../../../types/category";

describe("CategoryForm Unit Tests", () => {
  const category: Category = {
    id: "07bcf27a-838e-4a05-a8a3-4c7182b9ec81",
    name: "Navy",
    description: "",
    is_active: true,
    deleted_at: null,
    created_at: "2022-01-17 00:44:21",
    updated_at: "2022-01-17 00:44:21",
  };

  const Props: CategoryFormProps = {
    category: category,
    isLoading: false,
    isDisabled: false,
    handleSubmit: jest.fn(),
    handleChange: jest.fn(),
    handleToggle: jest.fn(),
    children: "Create Category",
  };
  it("should render category form with data", () => {
    const { asFragment } = render(<CategoryForm {...Props} />, {
      wrapper: BrowserRouter,
    });
    expect(asFragment()).toMatchSnapshot();
  });
  it("should render category form on disabled", () => {
    const { asFragment } = render(
      <CategoryForm {...Props} isDisabled={true} />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("should render category form on loading", () => {
    const { asFragment } = render(
      <CategoryForm {...Props} isLoading={true} />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("should render category form without isDisabled and isLoading", () => {
    const { asFragment } = render(
      <CategoryForm {...Props} isDisabled={undefined} isLoading={undefined} />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
