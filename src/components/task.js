import React, { useState } from "react";
import { FaStar, FaCheck } from "react-icons/fa";

import Checkbox from "./layout/checkbox";
import { types } from "../contexts/tasks-reducer";
import useTasks from "../hooks/use-tasks";
// import useProjects from "../hooks/use-projects";
// import transformList from "../utils/transform-list";

const Task = ({ task, onDelete }) => {
  const [taskId, setTaskId] = useState(false);
  const { dispatch } = useTasks();
  // const { state: projectsState } = useProjects();
  // const listOfProjects = transformList(projectsState.projects);

  const handleClickTask = e => {
    const li = e.currentTarget.closest("li");

    if (li) {
      setTaskId(li.dataset.taskid);
    }

    dispatch({ type: types.SET_CURRENT_TASK, payload: task });
  };

  return (
    <li className="task" data-taskid={task._id}>
      <Checkbox
        id={task._id}
        isChecked={task.isArchived}
        type="archived"
        icon={<FaCheck />}
      />
      <div className="task__container">
        <span className="task__content" onClick={handleClickTask}>
          {task.body}
        </span>
        <Checkbox
          id={task._id}
          isChecked={task.isImportant}
          type="important"
          icon={<FaStar />}
        />
      </div>
    </li>
  );
};

export default Task;
