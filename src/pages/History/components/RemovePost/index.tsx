import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { removeMyPost } from "@/redux/slicePosts";
import { removeComments } from '@/redux/sliceComments'
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

interface RemovePostProps {
    postId: number
}

export function RemovePost({ postId }: RemovePostProps) {
    const dispatch = useDispatch()

    function deletePost() {
        dispatch(removeComments(postId))
        dispatch(removeMyPost(postId))
        toast.success('Publicação removida com sucesso!')
    }

    return (
        <DialogContent>
            <DialogHeader className="font-extrabold">
                Excluir Publicação
            </DialogHeader>
            <DialogDescription className="grid gap-5">
                <span className="text-red-500">
                    Atenção! Ao excluir esta postagem os comentários
                    também serão excluídos.
                </span>
                <div className="grid grid-cols-2 gap-5">
                    <Button onClick={deletePost} className="font-extrabold">Excluir</Button>
                    <DialogClose asChild>
                        <Button className="font-extrabold">Cancelar</Button>
                    </DialogClose>
                </div>
            </DialogDescription>
        </DialogContent>
    )
}