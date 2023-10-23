export default function CardProduct() {
    return <div className=' bg-white overflow-hidden w-[220px] h-[300px] rounded-2xl border-2 hover:border-sky-500'  >
        <div className="w-full overflow-hidden  h-[75%] bg-gray-200 ">
            <img src='https://source.unsplash.com/random' />
        </div>
        <div className="h-[25%] flex flex-col justify-center px-3">
            <div className="text-[20px] ">Product name</div>
            <div className="text-[20px] font-bold">$3,999</div>
        </div>
    </div>
}