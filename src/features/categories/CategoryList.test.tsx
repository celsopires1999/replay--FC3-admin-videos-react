import { DataGridProps } from "@mui/x-data-grid";
import { fireEvent, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { renderWithProviders } from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { CategoryList } from "./CategoryList";
import { categoryResponse, categoryResponsePage2 } from "./mocks";

export const handlers = [
  rest.get(`${baseUrl}/categories`, (req, res, ctx) => {
    if (req.url.searchParams.get("page") === "2") {
      return res(ctx.json(categoryResponsePage2), ctx.delay(150));
    }
    return res(ctx.json(categoryResponse), ctx.delay(150));
  }),

  rest.delete(
    `${baseUrl}/categories/06fe24ca-71cc-4d55-9a64-82f953501b34`,
    (_, res, ctx) => {
      return res(ctx.delay(150), ctx.status(204));
    }
  ),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Category List Integrated Tests", () => {
  it("should render category list page", async () => {
    const { asFragment } = renderWithProviders(<CategoryList />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render loading state", () => {
    renderWithProviders(<CategoryList />);
    const loading = screen.getByRole("progressbar");
    expect(loading).toBeInTheDocument();
  });

  it("should render success state", async () => {
    renderWithProviders(<CategoryList />);
    const name = await screen.findByText("Docker");
    expect(name).toBeInTheDocument();
  });

  it("should render error state", async () => {
    server.use(
      rest.get(`${baseUrl}/categories`, (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    renderWithProviders(<CategoryList />);
    const error = await screen.findByText("Error fetching categories");
    expect(error).toBeInTheDocument();
  });

  it("should handle on page change", async () => {
    renderWithProviders(<CategoryList />);
    let name = await screen.findByText("Docker");
    expect(name).toBeInTheDocument();

    const nextButton = await screen.findByTestId("KeyboardArrowRightIcon");
    fireEvent.click(nextButton);

    name = await screen.findByText("LightSlateGray");
    expect(name).toBeInTheDocument();
  });

  it("should handle filter change", async () => {
    renderWithProviders(<CategoryList />);
    const name = await screen.findByText("Docker");
    expect(name).toBeInTheDocument();

    const input = screen.getByPlaceholderText("Search…");
    fireEvent.change(input, { target: { value: "Chocolate" } });

    const loading = await screen.findByRole("progressbar");
    expect(loading).toBeInTheDocument();
  });

  it("should handle delete category success", async () => {
    renderWithProviders(<CategoryList />);
    let name = await screen.findByText("Docker");
    expect(name).toBeInTheDocument();

    const deleteButton = screen.getAllByTestId("delete-button")[0];
    fireEvent.click(deleteButton);

    name = await screen.findByText("Category deleted successfully");
    expect(name).toBeInTheDocument();
  });
});
