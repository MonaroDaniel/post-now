import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Comment {
    postId: number;
    name: string;
    body: string;
}

const INITIAL_STATE: Comment[] = []

const sliceComments = createSlice({
    name: 'comments',
    initialState: INITIAL_STATE,
    reducers: {
        addComment(state, { payload }: PayloadAction<Comment>) {
            return [...state, { postId: payload.postId, name: payload.name, body: payload.body }]
        },
        removeComments(state, { payload }: PayloadAction<number>) {
            return state.filter(comments => comments.postId !== payload)
        }
    }
})

export default sliceComments.reducer;
export const { addComment, removeComments } = sliceComments.actions

export const useComments = (state: any) => {
    return state.comments as Comment[]
}