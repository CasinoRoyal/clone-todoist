import React from 'react';

export const renderList = (list, Component, fn) => {
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

        // <ul className="ctx-menu__list">
        //   {
        //     list.map((item) => {
        //       if (item.nestedList) {
        //        return (
        //          <ContextMenuItem
        //             key={item.length}
        //             itemName={item.name} 
        //             handleClick={(e)=> handleClick} 
        //          >
        //            <ul className="ctx-menu__list ctx-menu__list--insert">
        //               {
        //                 item.nestedList.map((nestedItem) => {
        //                   return (
        //                     <ContextMenuItem 
        //                       key={nestedItem.length}
        //                       itemName={nestedItem.name} 
        //                       handleClick={(e) => handleClick} 
        //                     />
        //                   );
        //                 })
        //               }
        //             </ul>
        //          </ContextMenuItem>
        //        )
        //       }

        //       return (
        //         <ContextMenuItem 
        //           key={item.length}
        //           itemName={item.name} 
        //           handleClick={(e)=> handleClick} 
        //         />
        //       );
        //     })
        //   }
        // </ul>