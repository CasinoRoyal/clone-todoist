import { useContext } from 'react';

import { tasksContext } from '../contexts/tasks-context';

const useTasks = () => {
  return useContext(tasksContext);
};

export default useTasks;