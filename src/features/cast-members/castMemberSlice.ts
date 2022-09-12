import {
  CastMember,
  CastMemberParams,
  Result,
  Results,
} from "../../types/cast-member";
import { apiSlice } from "../api/apiSlice";

export const initialState: CastMember = {
  id: "",
  name: "",
  type: 1,
  created_at: "",
  updated_at: "",
  deleted_at: "",
};

const endpointUrl = "/cast_members";

function getCastMembers({ page = 1, per_page = 10, search = "" }) {
  const params = { page, per_page, search };

  return `${endpointUrl}?${parseQueryParams(params)}`;
}

function parseQueryParams(params: CastMemberParams): string {
  const query = new URLSearchParams();

  params.page && query.append("page", params.page.toString());
  params.per_page && query.append("per_page", params.per_page.toString());
  params.search && query.append("search", params.search.toString());

  return query.toString();
}

function getCastMember(id: string) {
  return `${endpointUrl}/${id}`;
}

function createCastMember(castMember: CastMember) {
  return {
    url: endpointUrl,
    method: "POST",
    body: castMember,
  };
}

function updateCastMember(castMember: CastMember) {
  return {
    url: `${endpointUrl}/${castMember.id}`,
    method: "PUT",
    body: castMember,
  };
}

function deleteCastMember(id: string) {
  return {
    url: `${endpointUrl}/${id}`,
    method: "DELETE",
  };
}

export const castMemberApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCastMembers: query<Results, CastMemberParams>({
      query: getCastMembers,
      providesTags: ["CastMembers"],
    }),
    getCastMember: query<Result, string>({
      query: getCastMember,
      providesTags: ["CastMembers"],
    }),
    createCastMember: mutation<Result, CastMember>({
      query: createCastMember,
      invalidatesTags: ["CastMembers"],
    }),
    updateCastMember: mutation<Result, CastMember>({
      query: updateCastMember,
      invalidatesTags: ["CastMembers"],
    }),
    deleteCastMember: mutation<void, string>({
      query: deleteCastMember,
      invalidatesTags: ["CastMembers"],
    }),
  }),
});

export const {
  useGetCastMembersQuery,
  useGetCastMemberQuery,
  useCreateCastMemberMutation,
  useUpdateCastMemberMutation,
  useDeleteCastMemberMutation,
} = castMemberApiSlice;
