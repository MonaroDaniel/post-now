import { Button } from '@/components/ui/button'
import { DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Post, addMyPosts, usePosts } from '@/redux/slicePosts'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'

const newPostFormSchema = z.object({
  title: z.string().min(1, 'O titulo é obrigatório'),
  body: z.string().min(1, 'Insira um comentário'),
})

type NewPostFormInputs = z.infer<typeof newPostFormSchema>

export function NewPost() {
  const dispatch = useDispatch()
  const posts = useSelector(usePosts)

  const { register, handleSubmit, reset } = useForm<NewPostFormInputs>({
    resolver: zodResolver(newPostFormSchema),
  })

  function handleCreateNewPost(data: NewPostFormInputs) {
    const verifyPostEqualTitle = posts.findIndex(
      (post) => post.title === data.title,
    )
    if (verifyPostEqualTitle < 0) {
      const newPost: Post = {
        id: Math.random(),
        title: data.title,
        body: data.body,
      }
      toast.success('Publicação criada com sucesso!')
      dispatch(addMyPosts(newPost))
      reset()
    } else {
      toast.error('Não é possível criar publicações com o mesmo título!')
    }
  }

  return (
    <DialogContent>
      <DialogHeader className="font-extrabold">Nova Publicação</DialogHeader>
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(handleCreateNewPost)}
      >
        <Input
          type="text"
          placeholder="Título"
          required
          {...register('title')}
        />
        <Textarea placeholder="Insira um texto..." {...register('body')} />
        <Button type="submit" className="font-extrabold">
          Publique
        </Button>
      </form>
    </DialogContent>
  )
}
