import { configureStore } from '@reduxjs/toolkit'
import slicePosts from './slicePosts'
import sliceComments from './sliceComments'

const store = configureStore({
  reducer: {
    posts: slicePosts,
    comments: sliceComments,
  },
})

export default store
