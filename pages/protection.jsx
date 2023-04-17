import {AiOutlineArrowRight} from "react-icons/ai";
import {useCallback, useState} from "react";

async function auth(password) {
    const response = await fetch("/api/protection", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            password: password,
        })
    })
    if (response.status === 200) {
        localStorage.setItem("auth", "true")
        return true
    } else {
        return false
    }
}

function protection() {
    const [password, setPassword] = useState("")

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleAuth = useCallback(async () => {
        const result = await auth(password);
        console.log("result: ", result)
        if (result) {
            window.location.href = "/"
        } else {
            alert("Wrong password!")
        }
    }, [password])

    return (
        <div className={"w-full h-screen max-h-screen flex justify-center items-center"}>
            <div className={"max-w-fit text-center"}>
                <p className={"text-2xl text-gray-500"}>Access is limited! </p>
                <div className={"w-full h-10 relative mt-4"}>
                    <input className={"w-full h-full bg-gray-100 focus:bg-gray-200 focus:border-0 outline-0 pl-2"}
                           type="password"
                           alt={"password input"}
                           onChange={handlePassword}
                           onKeyDown={(e) => {
                               if (e.key === "Enter") {
                                   handleAuth()
                               }
                           }}
                    />
                    <button
                        className={"w-10 h-full hover:bg-gray-300 flex justify-center items-center text-xl absolute top-0 right-0"}
                        onClick={handleAuth}
                    >
                        <AiOutlineArrowRight/></button>
                </div>
            </div>
        </div>
    )
}

export default protection