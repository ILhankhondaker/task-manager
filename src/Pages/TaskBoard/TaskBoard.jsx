import { useState } from "react";
import SearchTask from "./SearchTask";
import TaskAddDeleteAction from "./TaskAddDeleteAction";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTaskFound";

const TaskBoard = () => {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React & Next.js",
    description:
      "I want to Learn React such thanI can treat it like my slave and make it do whatever I want to do.",
    tags: ["web", "React", "Next.js"],
    priority: "High",
    isFavorite: true,
  };

  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null)


  // info add & edit function 
  function handleAddEditTask(newTask, isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }
    setShowAddModal(false);
    //  handleCloseClick();
  }

  function handleEditTask(task) {
    setTaskToUpdate(task);
    setShowAddModal(true);
  }

  // delete taask function   
  function handleDeleteTask(taskId) {
    const tasksAfterDelete = tasks.filter((task) => task.id !== taskId);
    setTasks(tasksAfterDelete);
  }

  // delte   all  task  function 
  function handleDeleteAllClick() {
    tasks.length = 0;
    setTasks([...tasks]);
  }


  // search bar function 
  function handleSearch(searchTerm) {
    console.log(searchTerm);

    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setTasks([...filtered]);

  }

  // close button function
  function handleCloseClick() {
    setShowAddModal(false);
    setTaskToUpdate(null);
  }


  // add favorite function 
  function handleFavorite(taskId) {
    setTasks(tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isFavorite: !task.isFavorite };
      } else {
        return task;
      }
    }))
  }
  return (
    <div>
      {/* Begin Table */}
      <section className="mb-20" id="tasks">


        {/* ===== show   add AddTask Modal============  */}
        {showAddModal && <AddTaskModal
          onSave={handleAddEditTask}
          onCloseClick={handleCloseClick}
          taskToUpdate={taskToUpdate}
        ></AddTaskModal>}
        <div className="container">


          {/* < ----------- Search Box  Component Start-----------> */}
          <SearchTask
            onSearch={handleSearch}
          ></SearchTask>
          {/* < ----------- Search Box Ends -----------> */}

          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">

            {/*====== task action component Task ( Add / Delete ) start ====== */}
            <TaskAddDeleteAction
              onAddClick={() => setShowAddModal(true)}
              onDeleteAllClick={handleDeleteAllClick}
            ></TaskAddDeleteAction>
            {/*====== task action component Task ( Add / Delete ) End ====== */}

            {/*+++++++++++++++ task list start +++++++++++++++ */}


            {
              tasks.length > 0 ?
                (<TaskList
                  tasks={tasks}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onFav={handleFavorite}
                ></TaskList>)
                :
                (<NoTaskFound></NoTaskFound>)
            }




            {/*+++++++++++++++ task list End +++++++++++++++ */}
          </div>
        </div>
      </section>
      {/* < -- End Table --> */}
    </div>
  );
};

export default TaskBoard;
