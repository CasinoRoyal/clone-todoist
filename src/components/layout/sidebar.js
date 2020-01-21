import React from 'react';
import { 
  FaChevronDown, 
  FaInbox, 
  FaRegCalendarAlt, 
  FaRegCalendar 
} from 'react-icons/fa';

const Sidebar = () => {

  return(
    <aside className="sidebar" data-testid="sidebar">
      <ul className="sidebar__generic">
        <li>
          <span><FaInbox />&nbsp;</span>
          <span>Inbox</span>
        </li>
        <li>
          <span><FaRegCalendar />&nbsp;</span>
          <span>Today</span>
        </li>
        <li>
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