import Signin from "./components/Signin"
import Signup from "./components/Signup"


function App() {
  
 
  return (
    <div className="w-[100vw] h-[100vh] bg-neutral-50 dark:bg-neutral-950 " >
      <Signup  className={" "} oauthoptions={["google","github"]} options={["email","password"]}   />
      <Signin  className={"  "} oauthoptions={["google","github"]}  options={["password","email"]} />
    </div>
  )
}

export default App
