import { Link, Navigate } from 'react-router-dom'
import NEXT from "../images/NEXT.png"
import { useAuth } from '../hooks/use-auth'
import { useModal } from '../hooks/use-modal'
import AdminModal from './AdminModal'
export default function Header() {
    const { isLogin, logout, authUser } = useAuth()
    const { onOpenModal } = useModal()
    console.log(authUser)
    return <header className='h-[100px] px-[220px] flex gap-10 justify-between items-center' >
        <Link to="/"><img src={NEXT} className=" flex justify-center items-center w-[300px] pb-2" /></Link>
        <ul className="w-[300px] flex justify-center items-center gap-5 text-sky-500 font-bold">
            <li className="hover:cursor-pointer"><Link to='/'>HOME</Link></li>
            <li className="hover:cursor-pointer"><Link to='/product'>All ITEM</Link></li>
            {authUser?.isAdmin === true ? <div className=""><a href='/admin'><div className="z-50 fixed bottom-5 right-5"
            ><AdminModal /></div>
            </a></div> : <div className=""> {isLogin ? <li className="hover:cursor-pointer"><Link to='/myitem'>MY ITEM</Link></li> : <div></div>}</div>}
            {isLogin ? <div className="flex justify-center items-center">
                <div className="hover:cursor-pointer border-2 bg-red-500 text-white font-semibold px-3 py-1 rounded-full" onClick={logout}> Logout </div> </div>
                : <li className="hover:cursor-pointer border-2 bg-sky-500 text-white font-semibold px-3 py-1 rounded-full" onClick={() => onOpenModal("loginModal")} >Login</li>}
        </ul>
    </header>

}

