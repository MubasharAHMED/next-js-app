import Button from "../components/ui/Button"
import Modal from "../components/business/Modal"
import TodoCategory from "../components/ui/TodoCategory"
import { FaPlus, FaTrash, FaRegEdit, FaRegCheckCircle } from "react-icons/fa"
import { createContext, useCallback, useState } from "react"

export const context = createContext()

export default function Home() {
  const [openModal, setOpenModal] = useState(false)
  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false)

  const [state, setState] = useState({
    lastId: 0,
    todoList: [],
  })

  const [activeList, setActiveList] = useState(0)

  const categoryClick = useCallback((id) => {
    setActiveList(id)
  }, [])

  const addTodoCategory = () => {
    setOpenModal(true)
    setAddModal(true)
    setEditModal(false)
  }

  const addTodo = () => {
    setOpenModal(true)
    setAddModal(false)
    setEditModal(false)
  }

  const removeTodo = () => {}

  const editTodo = () => {
    setOpenModal(true)
    setAddModal(false)
    setEditModal(true)
  }

  return (
    <context.Provider
      value={{
        setOpenModal,
        setAddModal,
        setEditModal,
        state,
        setState,
        setActiveList,
        activeList,
      }}
    >
      <div className="flex-col">
        <TodoCategory>
          {Array.isArray(state.todoList)
            ? state.todoList.map((category) => (
                <li
                  className="flex flex-col rounded-t-lg border-x-2 border-t-2"
                  key={category.id}
                  onClick={(e) => categoryClick(e, category.id)}
                >
                  <Button
                    className="inline-flex p-1 justify-self-center"
                    name={category.name}
                  >
                    {category.name}
                    <div className="flex">
                      <div className="ml-2  bg-green-500 px-2 rounded-l-lg text-black">
                        {category?.totalDone}
                      </div>
                      <div className=" bg-sky-600 px-2 rounded-r-lg text-black">
                        {category?.todo.length}
                      </div>
                    </div>
                  </Button>
                  <progress
                    className=""
                    value={category?.totalDone}
                    max={category?.todo.length}
                  />
                </li>
              ))
            : null}

          <Button className=" rounded-t-lg" onClick={addTodoCategory}>
            +
          </Button>
        </TodoCategory>

        <div className="flex justify-between p-2">
          <div className="flex">
            <FaPlus className="mr-2" onClick={addTodo} />
            <FaTrash className="mr-2" onClick={removeTodo} />
            <FaRegEdit className="mr-2" onClick={editTodo} />
          </div>
          <div>
            <FaRegCheckCircle />
          </div>
        </div>

        <div className=" flex flex-col">
          {state.todoList[activeList - 1]
            ? state.todoList[activeList - 1].todo.map((todo, index) => (
                <div
                  className="flex basis-full p-1 border-b-2 justify-between"
                  key={index}
                >
                  <div className="flex">
                    <input
                      name={index}
                      type="checkbox"
                      className="mr-1 border-2"
                      checked={todo.done}
                    />
                    <h1>{todo.description}</h1>
                  </div>

                  <div>
                    <FaTrash />
                  </div>
                </div>
              ))
            : null}
        </div>
        {openModal && <Modal add={addModal} edit={editModal} />}
      </div>
    </context.Provider>
  )
}
