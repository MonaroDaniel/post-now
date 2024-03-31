import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import * as z from 'zod'
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { Comment, addComment } from "@/redux/sliceComments";
import { api } from "@/axios";
import toast from "react-hot-toast";

interface PostCommentProps {
    postId: number
}

const newCommentFormSchema = z.object({
    name: z.string().min(1, 'O titulo é obrigatório'),
    body: z.string().min(1, 'Insira um comentário'),
})

type NewCommentFormInputs = z.infer<typeof newCommentFormSchema>

export function PostComment({ postId }: PostCommentProps) {
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        reset
    } = useForm<NewCommentFormInputs>({
        resolver: zodResolver(newCommentFormSchema)
    })

    function handleCreateNewComment(data: NewCommentFormInputs) {
        api.post('/comments', {
            body: {
                postId: postId,
                name: data.name,
                body: data.body
            }
        }).then(() => {
            const newComment: Comment = {
                postId: postId,
                name: data.name,
                body: data.body
            }
            toast.success('Comentário criado com sucesso!')
            dispatch(addComment(newComment))
            reset()
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <DialogContent>
            <DialogHeader className="font-extrabold">
                Adicionar um comentário
            </DialogHeader>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit(handleCreateNewComment)}>
                <Input
                    type="text"
                    placeholder="Nome"
                    required
                    {...register('name')}
                />
                <Textarea
                    placeholder="Insira um comentário..."
                    {...register('body')}
                />
                <Button type="submit" className="font-extrabold">Comentar</Button>
            </form>
        </DialogContent>
    )
}