function Product({name, type, img}) {
    return (
        <div className={"w-44 h-56 flex flex-col items-center relative p-4 m-2 bg-[#F7F7F7] dark:bg-gray-500/10 justify-between"}>
            <div className={"flex m-auto"}>
                <img className={"max-w-[144px] max-h-[144px] transform hover:cursor-pointer hover:-translate-y-1 transition-all duration-300"} src={`/products/${img}`} alt={name}/>
            </div>
            <div className={"w-full mt-2"}>
                <p className={"text-xs text-[#929292]"}>{name}</p>
                <p className={"text-xm text-[#343434]"}>{type}</p>
            </div>
        </div>
    )
}

export default Product;