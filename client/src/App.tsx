import Signin from "./components/Signin"
import Signup from "./components/Signup"


function App() {
  
 
  return (
    <div className="w-[100vw] h-[100vh] bg-neutral-50 dark:bg-neutral-950 " >
      <Signup  className={" "} oauthoptions={["google","github"]} options={["username"]}   />
      <Signin  className={"  "} oauthoptions={["google","github"]}  options={["password","username"]} />
    </div>
  )
}

export default App
