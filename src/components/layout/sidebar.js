import React, { useContext } from 'react';
import { 
  FaChevronDown, 
  FaInbox, 
  FaRegCalendarAlt, 
  FaRegCalendar 
} from 'react-icons/fa';
import userContext from '../../contexts/user-context';

const Sidebar = () => {
  const { projects } = useContext(userContext);
  console.log(projects)

  return(
    <aside className="sidebar" data-testid="sidebar">
      <ul className="sidebar__generic">
        <li className="inbox" data-testid="inbox">
          <span><FaInbox />&nbsp;</span>
          <span>Inbox</span>
        </li>

        <li className="today" data-testid="today">
          <span><FaRegCalendar />&nbsp;</span>
          <span>Today</span>
        </li>
        
        <li className="next_7" data-testid="next_7">
          <span><FaRegCalendarAlt />&nbsp;</span>
          <span>Next 7 days</span>
        </li>
      </ul>
      <div className="sidebar__middle">
        <span>
          <FaChevronDown />
          <h2>Projects</h2>
        </span>
        <ul className="sidebar__projects"></ul>
      </div>
    </aside>
  );
};

export default Sidebar;