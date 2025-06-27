import { useState } from "react";
import { ArrowRright, Eye, EyeClose, Githubicon, Googleicon } from "../assets/Icons.tsx"
import axios from "axios";
import { LinuxIcon } from "mmk-icons";





type SignupOption = "email" | "username" | "password";
type Oauthoptions = "google" | "github";

type SignupProps = {
    className?: String,
    options?: SignupOption[],
    oauthoptions?: Oauthoptions[],
    title?: String,
    subtitle?: String,
    sidedImage?: string,
    afterSignUrl: string,
    authSecret: string

}

export default function Signin({
    className,
    options,
    oauthoptions,
    title = "Welcome Back To Login",
    subtitle = "",
    sidedImage,
    afterSignUrl,
    authSecret = ""
}
    : SignupProps) {

    const [formValues, setFormValues] = useState({ username: "", email: "", password: "", key: authSecret });
    const [error, setError] = useState({
        username: false,
        email: false,
        password: false,
    });
    const minSize = 1;
    const [passwordType, setPasswordType] = useState<String>("password")
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const uniqueOptions = Array.from(new Set(options));

    const allowedOptions: SignupOption[] = ["email", "username", "password"];
    const invalidOptions = uniqueOptions.filter(opt => !allowedOptions.includes(opt as SignupOption));

    if (invalidOptions.length > 0) {
        console.warn(`Signup component received invalid option(s): ${invalidOptions.join(", ")}`);
        throw new Error(`Invalid signup options: ${invalidOptions.join(", ")}`);
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors = {
            username: options?.includes("username") ? (formValues.username.trim() === "" || formValues.username.trim().length < minSize) : false,
            email: options?.includes("email") ? formValues.email.trim() === "" : false,
            password: options?.includes("password") ? (formValues.password.trim() === "" || formValues.password.trim().length < minSize) : false,

        }

        setError(newErrors);

        if (Object.values(newErrors).some(Boolean)) return;



        try {
            setIsLoading(true)
            // const response = await axios.post("http://localhost:8000/api/signin", formValues)
            const response = await axios.post("http://localhost:3000/api/signin-app-user", formValues, {
                withCredentials: true
            })

            if (response.data.message === "logged in success with email" || response.data.message === "logged in success with username") {
                console.log(response)
                window.location.href = afterSignUrl;
                alert("logged successfully✅")
            }
        } catch (error) {
            console.log("error while logging", error)
            alert(`failed ${error}`)
        }
        finally {
            setIsLoading(false)
            setFormValues((prev) => ({
                username: "",
                email: "",
                password: "",
                key: prev.key,
            }));
        }

    };





    return (
        <div className="flex gap-8 justify-center items-center w-[100vw] h-[100vh] bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200  " >

            {!!sidedImage && <div className="w-[60%] px-4 py-8 h-full hidden lg:flex " >
                <img className="w-full h-full object-cover rounded-xl bg-neutral-800  " src={sidedImage} alt="image" />
            </div>}


            <div className={`${className} w-[100vw] md:w-[45vw] lg:w-[30vw]  min-h-[100vh] lg:min-h-[70vh] flex flex-col items-center gap-15 py-4 px-6   z-20  lg:rounded-xl  lg:border-1 dark:border-neutral-700/50 border-neutral-300/50  `} >

                <div className="flex flex-col justify-center items-center " >
                    <h1 className="text-2xl font-bold tracking-tight capitalize ">{title}</h1>
                    <p className=" line-clamp-3 capitalize " >{subtitle}</p>
                </div>


                <form onSubmit={handleSubmit} className=" w-full py-2 px-3 flex flex-col gap-5 ">

                    {options?.includes("username") && <div className="flex flex-col gap-1  " >
                        <label htmlFor="name" className="text-lg font-medium" >Username</label>
                        <input
                            type="text"
                            placeholder="Jone"
                            name="name"
                            value={formValues.username}
                            onChange={e => {
                                setError({ ...error, username: false })
                                setFormValues({ ...formValues, username: e.target.value })
                            }}
                            className={` ${(error.username) ? "outline-red-400" : ""}  autofill:bg-gray-700/30 bg-neutral-200  dark:bg-neutral-800 placeholder:text-md text-md p-2 rounded-md  outline-1 outline-neutral-400/50 focus:outline-neutral-400 shadow-md/20 shadow-neutral-900  `} />
                        {(formValues.username.length < minSize && error.username) && <p className="text-sm font-light text-red-400 capitalize ml-1 " >it should be latest {minSize} letters</p>}
                    </div>}

                    {options?.includes("email") && <div className="flex flex-col gap-1  " >
                        <label htmlFor="email" className="text-lg font-medium" >Email</label>
                        <input
                            type="email"
                            placeholder="ex@example.com"
                            name="email"
                            value={formValues.email}
                            onChange={e => {
                                setError({ ...error, email: false })
                                setFormValues({ ...formValues, email: e.target.value })
                            }}
                            className={`${(error.email) ? "outline-red-400" : ""}  autofill:bg-gray-700/30 bg-neutral-200  dark:bg-neutral-800 placeholder:text-md text-md p-2 rounded-md  outline-1 outline-neutral-400/50 focus:outline-neutral-400 shadow-md/20 shadow-neutral-900  `} />
                    </div>}


                    {options?.includes("password") && <div className="flex flex-col gap-1  " >
                        <label htmlFor="password" className="text-lg font-medium" >Password</label>
                        <input
                            type={`${passwordType}`}
                            placeholder="••••••••••"
                            name="password"
                            value={formValues.password}
                            onChange={e => {
                                setError({ ...error, password: false })
                                setFormValues({ ...formValues, password: e.target.value })
                            }}

                            className={` ${(error.password) ? "outline-red-400" : ""}  autofill:bg-gray-700/30 bg-neutral-200  dark:bg-neutral-800 placeholder:text-md text-md p-2 rounded-md  outline-1 outline-neutral-400/50 focus:outline-neutral-400 shadow-md/20 shadow-neutral-900 `} />
                        <button onClick={() => {
                            if (passwordType === "password") setPasswordType("text")
                            if (passwordType === "text") setPasswordType("password")

                        }} type="reset" className="absolute self-end mt-11 mr-1 cursor-pointer " >
                            {passwordType === "password" ? <Eye /> : <EyeClose />}
                        </button>
                        <div className="w-full flex justify-between items-center " >
                            {(formValues.password.length < minSize && error.password) && <p className="text-sm font-light text-red-400 capitalize ml-1 " >it should be latest {minSize} letters</p>}
                            {true && <p className="text-sm hover:underline ml-auto text-blue-500 font-light cursor-pointer" >Forget Password</p>}
                        </div>
                    </div>}

                    {options && <button type="submit" className="w-full mt-3 font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 bg-neutral-300 dark:bg-neutral-800 cursor-pointer  py-2 px-3 flex justify-center items-center gap-1 rounded-lg " >Login{!isLoading ? <LinuxIcon className=" animate-bounce " /> : <ArrowRright />} </button>
                    }

                </form>


                <div className="w-full flex flex-col justify-center items-center gap-1 " >
                    {options && oauthoptions && <div className="flex w-full justify-center items-center gap-0.5 mb-3 " >
                        <span className="border-1 w-1/2 h-0 border-neutral-500/40 opacity-[.5] shadow-2xl  " ></span>
                        <span className="text-neutral-300" >or</span>
                        <span className="border-1 w-1/2 h-0 border-neutral-500/40 opacity-[.5] " ></span>
                    </div>}
                    <div className=" w-full  flex flex-col justify-center gap-2 ">
                        {oauthoptions?.includes("github") && <button className="w-full font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 bg-neutral-300 dark:bg-neutral-800 cursor-pointer  py-2 px-3 flex justify-center items-center gap-3 rounded-lg " >  <Githubicon /> <p>Continue with Github</p> </button>
                        }
                        {oauthoptions?.includes("google") && <button className="w-full font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 bg-neutral-300 dark:bg-neutral-800 cursor-pointer  py-2 px-3 flex justify-center items-center gap-3 rounded-lg " >  <Googleicon /> <p>Continue with Google</p> </button>
                        }
                    </div>
                    <div className="mt-1 text-md lg:text-sm font-semibold tracking-tighter  " >
                        <span>New user?</span><span className="text-blue-500 cursor-pointer hover:underline ml-0.5 ">Register</span>
                    </div>
                </div>

            </div>
        </div>
    )
}
