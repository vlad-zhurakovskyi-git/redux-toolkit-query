import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: 'apiSlice',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3333/',
	}),
	tagTypes: ['todos'],
	endpoints: (build) => ({
		getTodos: build.query({
			query: () => 'todos',
			providesTags: () => ['todos'],
		}),
		createTodo: build.mutation({
			query: (post) => ({
				url: 'todos',
				method: 'POST',
				body: post,
			}),
			invalidatesTags: ['todos'],
		}),
		deleteTodo: build.mutation({
			query: (id) => ({
				url: `todos/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['todos'],
		}),
		updateTodo: build.mutation({
			query: (post) => ({
				url: `todos/${post.id}`,
				method: 'PUT',
				body: post,
			}),
			invalidatesTags: ['todos'],
		})
	})
})

export const {
	useGetTodosQuery,
	useDeleteTodoMutation,
	useCreateTodoMutation,
	useUpdateTodoMutation
} = apiSlice;