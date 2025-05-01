import React from "react";
import DraggleComponent from "./DraggleComponent";

export default function BoardArea({
cardItems,
newListName,
setNewListName,
onAddList,
onAddItem,
onRemoveList,
onDeleteItem,
onEditItem,
onDragEnd,
}) {
return (
   <div className="board_area_container">
     <div className="board_area_container_dashbaord">
       <h2>Board Menu</h2>
       {/* List creation controls */}
       <div style={{ display: "flex", marginBottom: 16 }}>
         <input
           type="text"
           placeholder="New list name"
           value={newListName}
           onChange={(e) => setNewListName(e.target.value)}
         />
         <button onClick={onAddList}>Add List</button>
       </div>

       <DraggleComponent
         cardItems={cardItems}
         onAddItem={onAddItem}
         onRemoveList={onRemoveList}
         onDragEnd={onDragEnd}
         onDeleteItem={onDeleteItem}
         onEditItem={onEditItem}
       />
     </div>
   </div>
);
}