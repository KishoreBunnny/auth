import { ArrowRright, Githubicon, Googleicon } from "../assets/icons.tsx"



const fieldConfigs: Record<SignupOption, {
    type: string;
    placeholder: string;
    name: string;
}> = {
    email: {
        type: "email",
        placeholder: "ex@example.com",
        name: "email",
    },
    username: {
        type: "text",
        placeholder: "Jone",
        name: "username",
    },
    password: {
        type: "password",
        placeholder: "••••••••••",
        name: "password",
    },
};








type SignupOption = "email" | "username" | "password";

type SignupProps = {
    className?: String,
    options?: SignupOption[],
}

export default function Signup({
    className,
    options = ["email", "password"],
}
    : SignupProps) {

    const uniqueOptions = Array.from(new Set(options));

    const allowedOptions: SignupOption[] = ["email", "username", "password"];
    const invalidOptions = uniqueOptions.filter(opt => !allowedOptions.includes(opt as SignupOption));

    if (invalidOptions.length > 0) {
        console.warn(`Signup component received invalid option(s): ${invalidOptions.join(", ")}`);
        throw new Error(`Invalid signup options: ${invalidOptions.join(", ")}`);
    }




    if (options) {
        console.log(options)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted");
    };
    const text = "By creating account your accepting the conditions"


    return (
        <div className="flex justify-center items-center w-full h-full bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200  " >
            <div className={`${className} w-[100vw] md:w-[45vw] lg:w-[30vw]  min-h-[100vh] lg:min-h-[70vh] flex flex-col items-center gap-15  py-4 px-6   z-20  lg:rounded-xl  lg:border-1 dark:border-neutral-700/50 border-neutral-300/50  `} >

                <div className="flex flex-col justify-center items-center " >
                    <h1 className="text-2xl font-bold tracking-tight ">Create An Account</h1>
                    <p className=" line-clamp-3 " >{text}</p>
                </div>

                <form onSubmit={handleSubmit} className=" w-full py-2 px-3 flex flex-col gap-5 ">


                    {
                        uniqueOptions?.map((option) => {
                            const config = fieldConfigs[option];

                            return (

                                <div key={option} className="flex flex-col gap-1  " >
                                    <label htmlFor={option} className="text-lg font-medium capitalize " >{option}</label>
                                    <input
                                        type={config.type}
                                        placeholder={config.placeholder}
                                        name={option}
                                        className=" autofill:bg-gray-700/30 bg-neutral-200  dark:bg-neutral-800 placeholder:text-md text-md p-2 rounded-md  outline-1 outline-neutral-400/50 focus:outline-neutral-400 shadow-md/20 shadow-neutral-900  " />
                                </div>
                            )
                        })
                    }


                    {/* <div className="flex flex-col gap-1  " >
                        <label htmlFor="name" className="text-lg font-medium" >Username</label>
                        <input type="text" placeholder="Jone" name="name" className=" autofill:bg-gray-700/30 bg-neutral-200  dark:bg-neutral-800 placeholder:text-md text-md p-2 rounded-md  outline-1 outline-neutral-400/50 focus:outline-neutral-400 shadow-md/20 shadow-neutral-900  " />
                    </div>

                    <div className="flex flex-col gap-1  " >
                        <label htmlFor="email" className="text-lg font-medium" >Email</label>
                        <input type="email" placeholder="ex@example.com" name="email" className=" autofill:bg-gray-700/30 bg-neutral-200  dark:bg-neutral-800 placeholder:text-md text-md p-2 rounded-md  outline-1 outline-neutral-400/50 focus:outline-neutral-400 shadow-md/20 shadow-neutral-900  " />
                    </div>


                    <div className="flex flex-col gap-1  " >
                        <label htmlFor="password" className="text-lg font-medium" >Password</label>
                        <input type="password" placeholder="••••••••••" name="password" className=" autofill:bg-gray-700/30 bg-neutral-200  dark:bg-neutral-800 placeholder:text-md text-md p-2 rounded-md  outline-1 outline-neutral-400/50 focus:outline-neutral-400 shadow-md/20 shadow-neutral-900  " />
                    </div> */}




                    <button type="submit" className="w-full mt-3 font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 bg-neutral-300 dark:bg-neutral-800 cursor-pointer  py-2 px-3 flex justify-center items-center gap-1 rounded-lg " >Create account<ArrowRright /> </button>


                </form>



                <div className="w-full flex flex-col justify-center items-center gap-1 " >
                    <div className="flex w-full justify-center items-center gap-0.5 mb-3 " >
                        <span className="border-1 w-1/2 h-0 border-neutral-500/40 opacity-[.5] shadow-2xl  " ></span>
                        <span className="text-neutral-300" >or</span>
                        <span className="border-1 w-1/2 h-0 border-neutral-500/40 opacity-[.5] " ></span>
                    </div>
                    <div className=" w-full  flex flex-col justify-center gap-2 ">
                        <button className="w-full font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 bg-neutral-300 dark:bg-neutral-800 cursor-pointer  py-2 px-3 flex justify-center items-center gap-3 rounded-lg " >  <Githubicon /> <p>Continue with Github</p> </button>
                        <button className="w-full font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 bg-neutral-300 dark:bg-neutral-800 cursor-pointer  py-2 px-3 flex justify-center items-center gap-3 rounded-lg " >  <Googleicon /> <p>Continue with Google</p> </button>
                    </div>
                    <div className="mt-1 text-md lg:text-sm font-semibold tracking-tighter " >
                        <span>Already have an account?</span><span className="text-blue-500 cursor-pointer hover:underline ml-0.5 ">Login</span>
                    </div>
                </div>

            </div>
        </div>
    )
}