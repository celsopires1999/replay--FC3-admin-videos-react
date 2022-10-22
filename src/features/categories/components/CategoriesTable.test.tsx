import { render } from "@testing-library/react";
import {
  CategoriesTable,
  Props as CastMembersTableProps,
} from "./CategoriesTable";
import { BrowserRouter } from "react-router-dom";
import { Results } from "../../../types/category";

describe("CategoriesTable Unit Tests", () => {
  const apiResult: Results = {
    data: [
      {
        id: "07bcf27a-838e-4a05-a8a3-4c7182b9ec81",
        name: "Navy",
        description: null,
        is_active: true,
        deleted_at: null,
        created_at: "2022-01-17 00:44:21",
        updated_at: "2022-01-17 00:44:21",
      },
      {
        id: "0825e686-1ff8-4bcd-b55a-7eb3677d16e7",
        name: "SeaGreen",
        description: null,
        is_active: true,
        deleted_at: null,
        created_at: "2022-01-17 00:44:21",
        updated_at: "2022-01-17 00:44:21",
      },
    ],
    links: {
      first: "http://host.docker.internal:8000/api/categories?page=1",
      last: "http://host.docker.internal:8000/api/categories?page=1",
      prev: null,
      next: "http://host.docker.internal:8000/api/categories?page=1",
    },
    meta: {
      current_page: 1,
      from: 1,
      last_page: 1,
      path: "http://host.docker.internal:8000/api/categories",
      per_page: 15,
      to: 15,
      total: 2,
    },
  };

  const Props: CastMembersTableProps = {
    data: undefined,
    perPage: 15,
    isFetching: true,
    rowsPerPage: [15, 30, 45],
    handleOnPageChange: jest.fn(),
    handleFilterChange: jest.fn(),
    handleOnPageSizeChange: jest.fn(),
    handleDelete: jest.fn(),
  };

  it("should render categories table with data", () => {
    const { asFragment } = render(
      <CategoriesTable {...Props} data={apiResult} />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render categories table with fetching", () => {
    const { asFragment } = render(
      <CategoriesTable {...Props} data={apiResult} isFetching={true} />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render categories table with empty data", () => {
    const { asFragment } = render(<CategoriesTable {...Props} />, {
      wrapper: BrowserRouter,
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
