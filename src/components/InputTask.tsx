import React, {FC, useState, SetStateAction, Dispatch} from 'react'

import {
  ITask
} from './interfaces'

import { DeleteTaskButton, Calendar,} from './'


const InputTask = (props: any) => {
  const {task, setTask, deadline, setDeadline, todoList, setTodoList} = props

  const [showCalendar, setShowCalendar] = useState<boolean>(false)

  const handleTaskInput = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value)
    setTask(e.currentTarget.value)
  }

  const handleDeadlineInput = (e: React.FormEvent<HTMLInputElement>) => {
    setDeadline(e.currentTarget.value)

  }

  const handleAddTaskToList = (e: React.FormEvent): void => {
    e.preventDefault()
    const newTask = {taskName: task, deadline: deadline}
      setTodoList([...todoList, newTask])
      setTask('')
      setDeadline('')
      const inputFormForTask = (document.getElementById("inputForTask") as HTMLFormElement)
      inputFormForTask.focus()

  }

  const handleRemoveTask = (todoObj: object) => {
    const indexOfClickedTodo = todoList.indexOf(todoObj)
    const arrayOfTodos = todoList
    arrayOfTodos.splice(indexOfClickedTodo, 1)
    setTodoList([...arrayOfTodos])
  }

  const showCalendarOnClick = () => {
    console.log('show click')
    setShowCalendar(!showCalendar)

  }
  // const hideCalendarOnClick = () => {
  //   if (showCalendar === true) {
  //     console.log('hide click')
  //     setShowCalendar(false)
  //   }

  // }


  return (<div
    // onClick={hideCalendarOnClick}
  >

    {/* <form className="todoInputForm"
      // onSubmit={handleAddTaskToList}
    > */}
    <div className="todoInputForm"
      // onSubmit={handleAddTaskToList}
    >
      <input id="inputForTask" placeholder="task" type="text" value={task} onChange={handleTaskInput} />
      {/* <input placeholder="days to complete" type="number" value={deadline} onChange={handleDeadlineInput} /> */}

      <button
      onClick={showCalendarOnClick}
      > Add Due Date </button>
      <Calendar showCalendarOnClick={showCalendarOnClick} showCalendar={showCalendar} setShowCalendar={setShowCalendar} />

      <button
        onClick={handleAddTaskToList}
        >Add Task
      </button>
   </div>
   {/* </form> */}


    <div className="todoListDisplay" >
      {todoList.map((todo: ITask, idx: number) => {
        const {taskName, deadline} = todo
        return(
        <div className="todoListContainer" key={idx}>
            <ul className="ulTodoList">
              <ul id={`${taskName}`} className="todoListTask">
                <li> <h4>Task: {taskName} </h4> </li>
                <li> <h5> Days left to complete: {deadline} </h5> </li>
                < DeleteTaskButton
                handleRemoveTask={handleRemoveTask}
                todo={todo}
                />
              </ul>
            </ul>
          </div>
          )
      })}

      {todoList.length < 1
      ?
      <div>
        <h2>There are no items in your todo list</h2>
        <h3> please enter your task and deadline above </h3>
      </div>
      :
      ''
      }
    </div>
  </div>)

}

export default InputTask
