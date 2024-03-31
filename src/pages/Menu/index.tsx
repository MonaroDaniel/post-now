import { History, Home, Plus } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { useLocation, useNavigate } from 'react-router-dom'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { NewPost } from './components/NewPost'

export function Menu() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="flex flex-row sm:justify-start justify-center sm:flex-col w-full pb-5 gap-5 mt-5 mx-2">
      <div className="flex justify-center">
        <div
          onClick={() => navigate('/')}
          className={`flex items-center gap-2 cursor-pointer ${location.pathname === '/' ? 'underline' : ''} hover:underline`}
        >
          <Home size={30} />
          <span className="text-xl sm:inline hidden">Página Inicial</span>
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus />
            <span className="font-extrabold">Nova Postagem</span>
          </Button>
        </DialogTrigger>
        <NewPost />
      </Dialog>
      <Button
        className={`${location.pathname === '/history' ? '' : 'border-2 border-white hover:text-black bg-black text-white'}`}
        onClick={() => navigate('/history')}
        size="sm"
      >
        <History />
        <span className="font-extrabold">Minhas Postagens</span>
      </Button>
    </div>
  )
}
