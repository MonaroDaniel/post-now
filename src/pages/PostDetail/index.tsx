import { api } from "@/axios";
import { Content } from "@/components/Content";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Comment, useComments } from "@/redux/sliceComments";
import { Post, usePosts } from "@/redux/slicePosts";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PostComment } from "../Home/components/PostComment";

export function PostDetail() {
    const { id } = useParams()
    const navigate = useNavigate();

    const comments = useSelector(useComments)
    const myPosts = useSelector(usePosts)

    const postInitialState: Post = {
        id: 0,
        title: '',
        body: ''
    }

    const [post, setPost] = useState<Post>(postInitialState)

    const [currentComments, setCurrentComments] = useState<Comment[]>([])

    useEffect(() => {
        if (id) {
            //Verifica se é necessário fazer a chamada da api ou do estado global de meus posts
            const verifyMyPosts = myPosts.filter(myPost => myPost.id === Number(id))
            if (verifyMyPosts.length > 0) {
                setPost(verifyMyPosts[0])
            } else {
                getPost(Number(id))
            }
        }
    }, [])

    useEffect(() => {
        getComments()
    }, [comments])

    function getPost(id: number) {
        api.get(`/posts/${id}`)
            .then(response => {
                setPost({
                    id: response.data.id,
                    title: response.data.title,
                    body: response.data.body,
                })
            }).catch(error => {
                console.log(error);
                setPost(postInitialState)
                navigate('/', { replace: true })
            })
    }

    function getComments() {
        api.get(`/posts/${id}/comments`)
            .then(response => {
                const currentCommentsArray: Comment[] = []
                response.data.forEach((comment: Comment) => {
                    currentCommentsArray.push({
                        postId: comment.postId,
                        name: comment.name,
                        body: comment.body,
                    })
                });

                //Verifica se existe algum comentario sobre este post e adiciona ao estado de comentários
                const newComments = comments.filter(comment => comment.postId === Number(id))
                const aditionalCommentsArray = currentCommentsArray.concat(newComments)

                //Ordena em ordem alfabética
                aditionalCommentsArray.sort((a, b) => {
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0;
                });

                setCurrentComments(aditionalCommentsArray)
            }).catch(error => {
                console.log(error);
                setCurrentComments([])
            })
    }

    return (
        <div className="w-full flex flex-col gap-2">
            <div className="flex gap-3">
                <ArrowLeft onClick={() => navigate(-1)} className="cursor-pointer" />
                {post.body.length <= 0 ? (
                    <h1 className="text-xl font-extrabold">Carregando...</h1>
                ) : ''}
            </div>
            <div className="hover:bg-neutral-800 rounded-lg transition-all">
                <Content
                    title={post.title}
                    body={post.body}
                />
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <MessageCircle onClick={(e) => {
                        e.stopPropagation()
                    }} className="cursor-pointer" />
                </DialogTrigger>
                <PostComment postId={Number(id)} />
            </Dialog>
            <Separator />
            <span className="text-lg font-extrabold">Comentários:</span>
            {currentComments.length > 0 ? currentComments.map(comment => (
                <div key={comment.name} className="flex flex-col gap-2">
                    <Content
                        title={comment.name}
                        body={comment.body}
                    />
                    <Separator />
                </div>
            )) : (
                <h1 className="text-xl font-extrabold">Nenhum comentário foi feito</h1>
            )}
        </div>
    )
}