import { useEffect, useState } from "react"


const useMousePointer = () => {
    const [position ,setPosition] = useState({x: 0, y: 0});

    const handleMove = (e) => {
        setPosition({x:e.clientX, y: e.clientY})
    }

    useEffect(()=> {
        window.addEventListener('mousemove',handleMove);

        return ()=> {
            window.removeEventListener('mousemove',handleMove);
        }
    },[])
}