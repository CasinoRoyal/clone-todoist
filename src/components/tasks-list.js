import React, { useState, useRef, useEffect } from 'react';

import Task from './task';
import useFetch from '../hooks/use-fetch';
import useProjects from '../hooks/use-projects';
import useTasks from '../hooks/use-tasks';
import { types } from '../contexts/tasks-reducer';
import WithCustomMenu from '../hoc/with-custom-menu';
import transformList from '../utils/transform-list';
import Spinner from './layout/spinner'

const TasksList = () => {
  const [tasks, setTasks] = useState([]);
  const [dragging, setIsDragging] = useState(false);
  const [isFetch, setIsFetch] = useState(true);
  const { state: tasksState, dispatch } = useTasks();
  const { state: projectsState } = useProjects();
  const listOfProjects = transformList(projectsState.projects);
  let dragItem = useRef();
  let dragNode = useRef();
  let enteredTaskIndex = useRef();

  useEffect(() => {
    setTasks(tasksState.tasks)
  }, [tasksState]);

  const handleDragStart = (e, taskOptions) => {
    dragNode.current = e.target;
    dragNode.current.addEventListener('dragend', handleDragEnd);

    dragItem.current = taskOptions;
  }

  const handleDragEnter = (e) => {
    e.preventDefault();

    if (e.currentTarget === dragNode.current) return;

    const indexEnterTask = tasks.findIndex(task => {
      return task._id === e.currentTarget.dataset.taskid
    });
    enteredTaskIndex.current = indexEnterTask;
  }

  const handleDragEnd = () => {
    const copyTasks = [...tasks];
    const dragIdx = dragItem.current.taskIndex;
    const enteredIdx = enteredTaskIndex.current;
    const insertTask = copyTasks.splice(dragIdx, 1)[0];
    copyTasks.splice(enteredIdx, 0, insertTask);

    dragNode.current.removeEventListener('dragend', handleDragEnd);
    dragNode.current = null;
    dragItem.current = null;
    setTasks(prevState => [...copyTasks]);
  }

  return(  
    <WithCustomMenu listOfProjects={listOfProjects}>
      <ul className='tasks__list'>
          {!tasks.length && (
            <h2 className="no-task">
              Oh, no! Empty list
              <span role="img" aria-label="upset">😦😦</span>
            </h2>
          )}
          
          {tasks.map((task, idx) => {
            return (
              <Task 
                key={task._id} 
                task={task}
                taskIndex={idx}
                handleDragStart={handleDragStart}
                handleDragEnter={handleDragEnter}
                handleDragEnd={handleDragEnd}
              />
            )       
          })}
      </ul>
    </WithCustomMenu>
  );
};

export default TasksList;