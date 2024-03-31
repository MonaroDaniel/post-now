import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import { Home } from './pages/Home'
import { History } from './pages/History'
import { PostDetail } from './pages/PostDetail'
import { NotFound } from './pages/NotFound'

export function Router() {
    return (
        <Routes>
            <Route path='/' element={<DefaultLayout />}>
                <Route path='/' element={<Home />}/>
                <Route path='/post/:id' element={<PostDetail />}/>
                <Route path='/history' element={<History />}/>
                <Route path='*' element={<NotFound />}/>
            </Route>
        </Routes>
    )
}