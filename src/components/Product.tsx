import { ProductProps } from "../utils/types"

function Product({ name, type, img }: ProductProps) {
  return (
    <div className={'relative m-3 flex h-56 w-44 flex-col items-center justify-between rounded bg-[#F7F7F7] p-4 dark:bg-gray-500/10'}>
      <div className={'m-auto flex'}>
        <img
          className={'max-h-[144px] max-w-[144px] transform transition-all duration-300 hover:-translate-y-1 hover:cursor-pointer'}
          src={`/products/${img}`}
          alt={name}
        />
      </div>
      <div className={'mt-2 w-full'}>
        <p className={'text-xs text-[#929292]'}>{type}</p>
        <p className={'text-sm text-[#343434] dark:text-white'}>{name}</p>
      </div>
    </div>
  )
}

export default Product
