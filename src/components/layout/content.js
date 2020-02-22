import React, { useEffect, useContext } from 'react';

import Sidebar from './sidebar';
import TasksList from '../tasks-list';
import TaskDetails from '../task-details';
import useFetch from '../../hooks/use-fetch';
import { userContext } from '../../contexts/user-context'

const Content = () => {
  const { state } = useContext(userContext);
  const [{response, isLoading}, doFetch] = useFetch(`tasks/${state.currentProject}`);

  useEffect(() => {
    if (state && state.currentProject) {
      doFetch(null, 'GET');
    }
  }, [state, doFetch, state.isEdit]);

  return(
    <section className='content'>
      <Sidebar />

      <div className="tasks">
        {response && <TasksList tasks={response.tasks} />}
      </div>

      {state.currentTask && <TaskDetails task={state.currentTask}/>}
    </section>
  );
};

export default Content;