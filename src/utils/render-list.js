import React from 'react';

const renderList = (list, Component, fn) => {
  return (
    <ul className="ctx-menu__list">
      {
        list.map((item) => {
          if (item.nestedList) {
            return (
              <Component 
                key={item.name.length + Math.random() * 10} 
                itemName={item.name}
                handleClick={(e)=>fn(e)}
              >
                {
                  renderList(item.nestedList, Component, fn) 
                }
              </Component>
            )
          }

          return (
            <Component 
              key={item.name.length + Math.random() * 10} 
              itemName={item.name}
              handleClick={(e)=>fn(e)}
              id={item._id}
            />
          ) 
        })
      }
    </ul>
  )
};

export default renderList;