import type { User } from "../types"
import { api } from "./api"

export const userApi = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<
      { token: string },
      { login: string; password: string }
    >({
      query: userData => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
    }),
    register: builder.mutation<
      {
        login: string
        password: string
        surname: string
        firstname: string
        secondname: string
      },
      {
        login: string
        password: string
        surname: string
        firstname: string
        secondname: string
      }
    >({
      query: userData => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
    current: builder.query<User, void>({
      query: () => ({
        url: "/current",
        method: "GET",
      }),
    }),
    getuserById: builder.query<User, string>({
      query: id => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation<User, { userData: FormData; id: number }>({
      query: ({ userData, id }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: userData,
      }),
    }),
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useCurrentQuery,
  useLazyCurrentQuery,
  useGetuserByIdQuery,
  useLazyGetuserByIdQuery,
  useUpdateUserMutation,
} = userApi
export const {
  endpoints: { login, register, current, updateUser, getuserById },
} = userApi
