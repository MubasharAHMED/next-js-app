import * as yup from "yup"
import { Formik, Form } from "formik"
import { useCallback } from "react"
import FormField from "../ui/FormField"
import Button from "../ui/Button"
import { context } from "../../pages"
import { useContext } from "react"

const Modal = (props) => {
  const { add, edit } = props
  const {
    setOpenModal,
    setAddModal,
    setEditModal,
    setState,
    state,
    setActiveList,
    activeList,
  } = useContext(context)

  const initialValues = {
    description: "",
  }

  const validationSchema = yup.object().shape({
    description: yup.string().required(),
  })

  const addItem = useCallback((description) => {
    state.todoList.push({
      id: state.lastId + 1,
      name: description,
      todo: [],
      totalDone: 0,
    })

    setState((oldState) => ({
      ...oldState,
      lastId: state.lastId + 1,
      todoList: state.todoList,
    }))

    setOpenModal(false)

    setActiveList(state.lastId + 1)
  }, [])

  const addTodo = useCallback((description) => {
    const index = state.todoList.findIndex((x) => x.id === activeList)
    state.todoList[index].todo.push({ description: description, done: false })

    console.log(activeList - 1)

    setState((oldState) => ({
      ...oldState,
      todoList: state.todoList,
    }))

    setOpenModal(false)
    setAddModal(false)
    setEditModal(false)
  }, [])

  const closeModal = () => {
    setOpenModal(false)
  }

  const handleSubmit = useCallback((values, { resetForm }) => {
    if (edit && !add) {
      editTodo(values.description)
    }

    if (add) {
      addItem(values.description)
    } else if (!add) {
      addTodo(values.description)
    }

    resetForm()
  }, [])

  return (
    <div className="min-h-full min-w-full fixed inset-0 bg-white">
      <h4 className="text-2xl font-bold border-b-slate-400">
        {add ? "Create a new list" : "Create a todo"}
      </h4>

      <div className="modal-body">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col">
            <FormField
              label="Description"
              name="description"
              placeholder="Enter your list"
              className="font-bold p-2 "
              autoFocus={true}
            />

            <div className="flex flex-row fixed bottom-5 right-5">
              <Button
                className=" bg-white p-2 text-black font-bold mr-2"
                onClick={closeModal}
              >
                Cancel
              </Button>

              <Button
                className=" bg-blue-600	p-2 text-white font-bold rounded-lg "
                type="submit"
              >
                Create
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Modal
