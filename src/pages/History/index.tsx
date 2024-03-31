import { Content } from '@/components/Content'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { usePosts } from '@/redux/slicePosts'
import { MessageCircle, Trash2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RemovePost } from './components/RemovePost'
import { PostComment } from '../Home/components/PostComment'

export function History() {
  const posts = useSelector(usePosts)

  // Cria uma cópia dos posts e ordena a cópia
  const sortedPosts = posts
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title))

  return (
    <div className="w-full flex flex-col gap-2">
      <h1 className="text-xl font-extrabold text-center sm:text-left">
        Minhas Publicações
      </h1>
      {sortedPosts.length > 0 ? (
        sortedPosts.map((post) => (
          <div key={post.id} className="flex flex-col gap-2">
            <Link to={`/post/${post.id}`}>
              <div className="hover:bg-neutral-800 rounded-lg transition-all">
                <Content title={post.title} body={post.body} />
              </div>
            </Link>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <MessageCircle className="cursor-pointer" />
                </DialogTrigger>
                <PostComment postId={post.id} />
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Trash2 className="cursor-pointer" />
                </DialogTrigger>
                <RemovePost postId={post.id} />
              </Dialog>
            </div>
            <Separator />
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center text-center gap-3">
          <span className="text-4xl">Você ainda não tem postagens!</span>
        </div>
      )}
    </div>
  )
}
