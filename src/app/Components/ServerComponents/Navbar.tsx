import { useState } from 'react'
import ModalReg from '../Modal/ModalReg';
import ModalLogin from '../Modal/ModalLogin';

export default function Navbar() {

    const [showModalLogin, setShowModalLogin] = useState(false);
    const [showModalReg, setShowModalReg] = useState(false);

    const handleShowModal = (modalType: string) => {
        if(modalType === "login"){
            setShowModalLogin(true)
        } else {
            setShowModalReg(true)
        }
    }

  return (
    <main className="max-w-4xl mx-auto mt-4 flex navbar bg-primary text-primary-content rounded-2xl">
        <h1 className="text-2xl font-bold ml-4 cursor-pointer select-none">Todo App</h1>
        <ul className="menu menu-horizontal ml-auto ">
            <li><button onClick={() => handleShowModal('login')}>Log in</button></li>
            <li><button onClick={() => handleShowModal('register')}>Sign up</button></li>
        </ul>
        {showModalLogin && <ModalLogin onClose={() => setShowModalLogin(false)} isOpen={showModalLogin}/>}
        {showModalReg && <ModalReg onClose={() => setShowModalReg(false)} isOpen={showModalReg}/>}
    </main>
  )
}
