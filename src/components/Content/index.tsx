interface ContentProps {
    title: string;
    body: string;
}

export function Content({ title, body }: ContentProps) {
    return (
        <div className="flex flex-col gap-2 w-full p-5">
            <span className="font-extrabold text-lg">{title}</span>
            <span className="text-sm">{body}</span>
        </div>
    )
}