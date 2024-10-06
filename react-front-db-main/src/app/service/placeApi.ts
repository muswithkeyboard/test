import type { Place } from "../types"
import { api } from "./api"

export const placeApi = api.injectEndpoints({
  endpoints: bulder => ({
    createPlace: bulder.mutation<Place, { placeNumber: string }>({
      query: postData => ({
        url: "/places",
        method: "POST",
        body: postData,
      }),
    }),
    getAllPlace: bulder.query<Place[], void>({
      query: () => ({
        url: "/places",
        method: "GET",
      }),
    }),
    getPlaceById: bulder.query<Place, number>({
      query: id => ({
        url: `/places/${id}`,
        method: "GET",
      }),
    }),
    deletePlace: bulder.mutation<void, string>({
      query: id => ({
        url: `/places/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useCreatePlaceMutation,
  useGetAllPlaceQuery,
  useDeletePlaceMutation,
  useGetPlaceByIdQuery,
  useLazyGetPlaceByIdQuery,
  useLazyGetAllPlaceQuery,
} = placeApi
export const {
  endpoints: { createPlace, getAllPlace, getPlaceById, deletePlace },
} = placeApi
