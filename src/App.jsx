import Footer from "./Pages/Footer"
import Header from "./Pages/Header"
import Introduce from "./Pages/Introduce"
import TaskBoard from "./Pages/TaskBoard/TaskBoard"

function App() {
 
  return (
    <>
    <h1 className="text-center">Start New Project for To Do List </h1>
    <Header></Header>

    <div  className="flex flex-col justify-center items-center">
    <Introduce></Introduce>
    <TaskBoard></TaskBoard>
    </div>
   
    <Footer></Footer>
    </>
  )
}

export default App
