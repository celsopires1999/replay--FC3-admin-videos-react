import { render } from "@testing-library/react";
import {
  CastMembersTable,
  Props as CastMembersTableProps,
} from "./CastMembersTable";
import { BrowserRouter } from "react-router-dom";
import { Results } from "../../../types/cast-member";

describe("CastMembersTable Unit Tests", () => {
  const apiResult: Results = {
    data: [
      {
        id: "01a20423-248f-48a4-82d6-6b17a11961b8",
        name: "Effertz",
        type: 2,
        deleted_at: null,
        created_at: "2022-01-17 00:44:21",
        updated_at: "2022-09-29 03:12:42",
      },
      {
        id: "02cb9153-64fd-46b9-b5fe-38fd2f655d00",
        name: "Dickens",
        type: 1,
        deleted_at: null,
        created_at: "2022-01-17 00:44:21",
        updated_at: "2022-01-17 00:44:21",
      },
    ],
    links: {
      first: "http://host.docker.internal:8000/api/cast_members?page=1",
      last: "http://host.docker.internal:8000/api/cast_members?page=1",
      prev: null,
      next: "http://host.docker.internal:8000/api/cast_members?page=1",
    },
    meta: {
      current_page: 1,
      from: 1,
      last_page: 1,
      path: "http://host.docker.internal:8000/api/cast_members",
      per_page: 15,
      to: 15,
      total: 1,
    },
  };
  const Props: CastMembersTableProps = {
    data: undefined,
    perPage: 15,
    isFetching: false,
    rowsPerPage: [15, 30, 45],
    handleOnPageChange: jest.fn(),
    handleFilterChange: jest.fn(),
    handleOnPageSizeChange: jest.fn(),
    handleDelete: jest.fn(),
  };
  it("should render cast member table with data", () => {
    const { asFragment } = render(
      <CastMembersTable {...Props} data={apiResult} />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render cast member table with fetching", () => {
    const { asFragment } = render(
      <CastMembersTable {...Props} data={apiResult} isFetching={true} />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render cast member table with empty data", () => {
    const { asFragment } = render(<CastMembersTable {...Props} />, {
      wrapper: BrowserRouter,
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
