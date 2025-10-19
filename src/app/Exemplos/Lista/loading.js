const Loading = () => {
    return (
        <div className="flex flex-col gap-2">
            <label className="font-bold text-3xl">Carregando...</label>
            <div className="flex flex-col gap-2 mx-auto items-center">
                <div className="animate-pulse bg-gray-200 h-10 w-full rounded-md"></div>
                <div className="animate-pulse bg-gray-200 h-10 w-full rounded-md"></div>
            </div>
        </div>
    );
}

export default Loading;