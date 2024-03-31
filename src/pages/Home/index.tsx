import { Content } from '@/components/Content'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PostComment } from './components/PostComment'
import { Post } from '@/redux/slicePosts'
import { useEffect, useState } from 'react'
import { api } from '@/axios'

export function Home() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    getPosts()
  }, [])

  function getPosts() {
    api
      .get('/posts')
      .then((response) => {
        const currentPostArray: Post[] = []
        response.data.forEach((element: Post) => {
          currentPostArray.push({
            id: element.id,
            title: element.title,
            body: element.body,
          })
        })
        // Ordena em ordem alfabética
        currentPostArray.sort((a, b) => {
          if (a.title < b.title) return -1
          if (a.title > b.title) return 1
          return 0
        })

        setPosts(currentPostArray)
      })
      .catch((error) => {
        setPosts([])
        console.log(error)
      })
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <h1 className="text-xl font-extrabold">
        {posts.length > 0 ? 'Publicações' : 'Carregando...'}
      </h1>
      {posts.map((post) => (
        <div className="flex flex-col gap-2" key={post.id}>
          <Link to={`/post/${post.id}`}>
            <div className="hover:bg-neutral-800 rounded-lg transition-all">
              <Content title={post.title} body={post.body} />
            </div>
          </Link>
          <Dialog>
            <DialogTrigger asChild>
              <MessageCircle
                onClick={(e) => {
                  e.stopPropagation()
                }}
                className="cursor-pointer"
              />
            </DialogTrigger>
            <PostComment postId={post.id} />
          </Dialog>
          <Separator />
        </div>
      ))}
    </div>
  )
}
