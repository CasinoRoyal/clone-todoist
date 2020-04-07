import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Task from './task';
import useFetch from '../hooks/use-fetch';
import useProjects from '../hooks/use-projects';
import useTasks from '../hooks/use-tasks';
import { types } from '../contexts/tasks-reducer';
import WithCustomMenu from '../hoc/with-custom-menu';
import transformList from '../utils/transform-list';
import Spinner from './layout/spinner';

const TasksList = () => {
  const [tasks, setTasks] = useState([]);
  const { state: tasksState, dispatch } = useTasks();
  const { state: projectsState } = useProjects();
  const listOfProjects = transformList(projectsState.projects);

  useEffect(() => {
    setTasks(tasksState.tasks)
  }, [tasksState]);

  const handleDragEnd = (res) => {
    const copyTasks = [...tasks];
    const dragIdx = res.source.index;
    const enteredIdx = res.destination.index;

    const insertTask = copyTasks.splice(dragIdx, 1)[0];
    copyTasks.splice(enteredIdx, 0, insertTask);
    
    setTasks(prevState => [...copyTasks]);
  }

  return(  
    <WithCustomMenu listOfProjects={listOfProjects}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={`list`}>
          {(provided) => {
            return (
              <ul 
                className='tasks__list' 
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
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

                    >
                    </Task>
                  )       
                })}
                {provided.placeholder}
              </ul>
            )
          }}
        </Droppable>
      </DragDropContext>
    </WithCustomMenu>
  );
};

export default TasksList;