import type { To } from "../types"
import { api } from "./api"

export const toApi = api.injectEndpoints({
  endpoints: bulder => ({
    createTo: bulder.mutation<
      To,
      {
        placeNumber: string
        address: string
        protocol11: Object
        protocol12: Object
        protocol32: Object
        protocol51: Object
        protocol52: Object
        protocol61: Object
        protocol10: Object
      }
    >({
      query: postData => ({
        url: "/to",
        method: "POST",
        body: postData,
      }),
    }),
    getAllTo: bulder.query<To[], void>({
      query: () => ({
        url: "/to",
        method: "GET",
      }),
    }),
    getToById: bulder.query<To, number>({
      query: id => ({
        url: `/to/${id}`,
        method: "GET",
      }),
    }),
    updateTo: bulder.mutation<To, { toData: Object; id: string }>({
      query: ({ toData, id }) => ({
        url: `/to/${id}`,
        method: "PUT",
        body: toData,
      }),
    }),
    deleteTo: bulder.mutation<void, string>({
      query: id => ({
        url: `/to/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useCreateToMutation,
  useGetAllToQuery,
  useDeleteToMutation,
  useGetToByIdQuery,
  useLazyGetToByIdQuery,
  useLazyGetAllToQuery,
  useUpdateToMutation,
} = toApi
export const {
  endpoints: { createTo, getAllTo, getToById, updateTo, deleteTo },
} = toApi
