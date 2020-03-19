import React, { useState } from 'react';
import { FaTrash, FaEllipsisV } from 'react-icons/fa';

import Checkbox from './layout/checkbox';
import { types } from '../contexts/tasks-reducer';
import useTasks from '../hooks/use-tasks';
import useProjects from '../hooks/use-projects';
import ContextMenu from './context-menu/context-menu';
import transformList from '../utils/transform-list';

const Task = ({ task, onDelete }) => {
  const [showTaskMenu, setShowTaskMenu] = useState(false);
  const [taskId, setTaskId] = useState(false);
  const { dispatch } = useTasks();
  const { state: projectsState } = useProjects();
  const listOfProjects = transformList(projectsState.projects);
 
  const handleClickTask = (e) => {
    const li = e.currentTarget.closest('li');

    if (li) {
      setTaskId(li.dataset.taskid);
    }

    dispatch({type: types.SET_CURRENT_TASK, payload: task})
  }

  const handleClickTaskMenu = () => setShowTaskMenu((prevState) => !prevState);
  
  return (
    <li className="task" data-taskid={task._id}>
      <Checkbox id={task._id} isChecked={task.isArchived} />
      <div className="task__container">
        <span className="task__content" onClick={handleClickTask}>
          {task.body}
        </span>

        { showTaskMenu && (
          <div className="task__menu-container">
            <ContextMenu 
              listOfProjects={listOfProjects}
              apiUrl='tasks/moveTask'
              taskId={taskId}
            /> 
          </div>
        )}
        
        <button className="task__menu" onClick={handleClickTaskMenu}>
          <FaEllipsisV />
        </button>
      </div>
    </li>
  );
}

export default Task;