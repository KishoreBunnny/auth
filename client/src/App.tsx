import Signin from "./components/Signin"
import Signup from "./components/Signup"



function App() {


  return (
      <div className="w-[100vw] h-[100vh] bg-white dark:bg-white " >
        <Signup title="create an account" subtitle="continue with our app" oauthoptions={["google", "github"]} options={["username", "password",]} />
        <Signin className={"text-green-600 dark:text-sky-300 "} oauthoptions={["google", "github"]} options={["password", "username"]} />
      </div>
  )
}

export default App
