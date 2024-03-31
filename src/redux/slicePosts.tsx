import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Post {
    id: number;
    title: string;
    body: string;
}

const INITIAL_STATE: Post[] = []

const slicePosts = createSlice({
    name: 'posts',
    initialState: INITIAL_STATE,
    reducers: {
        addMyPosts(state, { payload }: PayloadAction<Post>) {
            return [...state, { id: payload.id, title: payload.title, body: payload.body }]
        },
        removeMyPost(state, { payload }: PayloadAction<number>) {
            return state.filter(post => post.id !== payload)
        }
    }
})

export default slicePosts.reducer;
export const { addMyPosts, removeMyPost } = slicePosts.actions

export const usePosts = (state: any) => {
    return state.posts as Post[]
}