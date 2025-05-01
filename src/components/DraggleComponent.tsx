import React, { useEffect, useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import EditModal from "./EditModal";

function DraggableItem({ id, content, onEdit, onDelete }) {
const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

const style:any = {
   transform: transform
     ? `translate(${transform.x}px, ${transform.y}px)`
     : undefined,
   border: "1px solid gray",
   padding: 8,
   margin: 4,
   backgroundColor: "white",
   position: "relative",
};

return (
   <div ref={setNodeRef} style={style}>
     {/* DRAG HANDLE: only here do drag events fire */}
     <div
       {...attributes}
       {...listeners}
       role="button"
       aria-label="Drag handle"
       aria-roledescription="move item"
       title="Drag to move"
       style={{
         cursor: "grab",
         display: "inline-block",
         marginRight: 8,
       }}
     >
       ≡
     </div>
     {/* CONTENT */}
     <span>{content}</span>

     {/* BUTTONS: now completely free of drag-listeners */}
     <div
       style={{
         position: "absolute",
         top: 4,
         right: 4,
         display: "flex",
         gap: 4,
       }}
     >
       <button onClick={onEdit}>✎</button>
       <button onClick={onDelete}>🗑</button>
     </div>
   </div>
);
}

function DroppableCard({
id,
items,
onAddItem,
onRemoveList,
onDeleteItem,
onEditItem,
}) {
const { setNodeRef } = useDroppable({ id });
const [inputValue, setInputValue] = useState("");

const handleAdd = () => {
   if (!inputValue.trim()) return;
   onAddItem(id, inputValue.trim());
   setInputValue("");
};

return (
   <div
     ref={setNodeRef}
     style={{
       width: 250,
       minHeight: 300,
       padding: 10,
       margin: 10,
       backgroundColor: "#f0f0f0",
       border: "2px dashed gray",
     }}
   >
     <div style={{ display: "flex", justifyContent: "space-between" }}>
       <h4>{id}</h4>
       <span style={{ cursor: "pointer" }} onClick={() => onRemoveList(id)}>
         ×
       </span>
     </div>

     <div style={{ display: "flex", marginBottom: 10 }}>
       <input
         type="text"
         placeholder="Add item"
         value={inputValue}
         onChange={(e) => setInputValue(e.target.value)}
         style={{ flex: 1, padding: 5 }}
       />
       <button onClick={handleAdd} style={{ marginLeft: 5 }}>
         Add
       </button>
     </div>

     {items.map((item) => (
       <DraggableItem
         key={item.id}
         id={item.id}
         content={item.content}
         onDelete={() => onDeleteItem(id, item.id)}
         onEdit={() => onEditItem(id, item)}
       />
     ))}
   </div>
);
}

export default function DraggleComponent({
cardItems,
onAddItem,
onRemoveList,
onDeleteItem,
onEditItem,
onDragEnd,
}) {
const [modalData, setModalData] = useState<any>(null);

const openEditModal = (listId, item) => {
   setModalData({ listId, ...item });
};
const closeModal = () => setModalData(null);
const saveEdit = (newContent) => {
   onEditItem(modalData.listId, modalData.id, newContent);
   closeModal();
};
return (
   <>
     <DndContext onDragEnd={onDragEnd}>
       <div style={{ display: "flex", flexWrap: "wrap" }}>
         {Object.entries(cardItems).length > 0 ? (
           Object.entries(cardItems).map(([listId, items]) => (
             <DroppableCard
               key={listId}
               id={listId}
               items={items}
               onAddItem={onAddItem}
               onRemoveList={onRemoveList}
               onDeleteItem={onDeleteItem}
               onEditItem={openEditModal}
             />
           ))
         ) : (
           <p>No lists available. Add a new list to get started!</p>
         )}
       </div>
     </DndContext>

     {modalData && (
       <EditModal
         initialContent={modalData.content}
         onSave={saveEdit}
         onCancel={closeModal}
       />
     )}
   </>
);
}