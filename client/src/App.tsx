import Signin from "./components/Signin"
import Signup from "./components/Signup"


const authSecret = import.meta.env.VITE_AUTH_SECRET

function App() {


  return (
    //  <div className="w-[100vw] h-[100vh] bg-white dark:bg-red-900 " >
    // <Signup
    //   title="create an account"
    //   subtitle="continue with our app"
    //   oauthoptions={["google", "github"]}
    //   options={["username", "password", "email"]}
    //   // sidedImage="https://pro.aceternity.com/world.svg"
    //   afterSignUrl="/dashboard" authSecret={authSecret} />

    <Signin
      // className={"text-[#0394E3] dark:text-[#00A6FB] "}
      oauthoptions={["google", "github"]}
      options={["password", "username"]}
      afterSignUrl="/dashboard" authSecret={authSecret}
      // sidedImage="https://res.cloudinary.com/dqvwhtmxh/image/upload/v1714563424/nimblechapps-new-site/link-preview-image/how-to-implement-custom-splash-screen-in-react-native.png"
    />  
    // {/* </div> */}
  )
}

export default App
