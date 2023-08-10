import Input from "@/components/input";
import {useCallback, useState} from "react";
import axios from 'axios';
import {signIn} from "next-auth/react";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";

const Auth = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // changing signin to login in the same page.
    const [varient, setVarient] = useState('login');

    const toggleVarient = useCallback(() => {
        setVarient((currentVarient) => currentVarient === "login" ? "register" : "login")
    }, []);

    const login = useCallback(async () => {
        try {
            await signIn("credentials", {
                email,
                password,
                callbackUrl: "/profiles",
            });
        } catch (error) {
            console.log(error);
        }
    }, [email, password]);

    const register = useCallback(async () => {
        try {
            await axios.post("/api/register", {
                name,
                email,
                password,
            });
            login();
        } catch (error) {
            console.log(error);
        }
    }, [name, email, password, login]);


    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpeg')] bg-no-repeat bg-center">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="logo" className="h-12"/>
                </nav>
                <div className="flex justify-center">
                    <div
                        className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">{varient === "login" ? "Sign in" : "Create an Account"}</h2>
                        <div className="flex flex-col gap-4">
                            {varient === "register" && (
                                <Input label="Username" onChange={(e: any) => setName(e.target.value)} value={name}
                                       id="name"/>
                            )}
                            <Input label="Email" onChange={(e: any) => setEmail(e.target.value)} value={email}
                                   id="email"
                                   type="email"/>
                            <Input label="Password" onChange={(e: any) => setPassword(e.target.value)} value={password}
                                   id="password"
                                   type="password"/>
                        </div>
                        <button
                            onClick={varient === "login" ? login : register}
                            className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transform">
                            {varient === "login" ? "login" : "Sign up"}
                        </button>
                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <div
                                onClick={() => signIn('google', {callbackUrl: '/profiles'})}
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                <FcGoogle size={30}/>
                            </div>
                            <div
                                onClick={() => signIn('github', {callbackUrl: '/profiles'})}
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                <FaGithub size={30}/>
                            </div>
                        </div>
                        <p className="text-neutral-500 mt-12 ">
                            {varient === "login" ? "First time using Netflix?" : "Already have an account?"}
                            <span onClick={toggleVarient}
                                  className="text-white ml-1 hover: underline cursor-pointer">{varient === "login" ? "Create an account" : "Login"}</span>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Auth;

