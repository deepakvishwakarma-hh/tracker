import useUser from "../lib/useUser"
import fetchJson from "../lib/fetchJson";
import { signInWithPopup } from "firebase/auth";
import { googleAuth, provider } from "../firebase.config"

const Auth = () => {

    const { mutateUser } = useUser({
        redirectTo: '/',
        redirectIfFound: true,
    })

    const autheticateWithGoogle = () => {
        signInWithPopup(googleAuth, provider)
            .then((data: any) => {
                console.log(data.user)
                if (data.user) {
                    const apiPayload = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: data.user.email, name: data.user.name })
                    }
                    mutateUser(fetchJson('/api/login', apiPayload))
                }
            })
            .catch((err: any) => { alert(err) })
    }
    return (
        <div style={{ height: "100%" }} className=" absolute top-0 w-full left-0 bg-red-gray flex items-center justify-center p-5">
            <div>
                <p className="text-xs uppercase font-medium text-gray-500" >Start Tracking yourself</p>
                <h1 className="text-xl py-1 font-medium">Login with Google.</h1>
                <p className="text-xs font-medium text-gray-500" >
                    Authenticate yourself with Google security
                </p>
                <button onClick={autheticateWithGoogle} className="border border-gray-500 rounded-sm px-10 text-sm py-1 mt-2 block  ">Login </button>
            </div>
        </div>
    )
}


export default Auth
