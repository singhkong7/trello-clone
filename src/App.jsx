/* eslint-disable no-irregular-whitespace */
import { useEffect, useState } from "react";
import BoardArea from "./components/BoardArea";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./App.css";

export default function App() {
const [cardItems, setCardItems] = useState(() => {
   const stored = localStorage.getItem("cardItems");
   return stored ? JSON.parse(stored) : {};
});

const [nextItemId, setNextItemId] = useState(1);
const [nextListId, setNextListId] = useState(1);
const [newListName, setNewListName] = useState("");

// Handlers
const handleAddList = () => {
   const listId = newListName.trim() || `list-${nextListId}`;
   if (cardItems[listId]) return;
   setCardItems((prev) => ({ ...prev, [listId]: [] }));
   setNextListId((id) => id + 1);
   setNewListName("");
};

const handleAddItem = (listId, content) => {
   const newItem = { id: `item-${nextItemId}`, content };
   setCardItems((prev) => ({
     ...prev,
     [listId]: [...(prev[listId] || []), newItem],
   }));
   setNextItemId((id) => id + 1);
};

const handleRemoveList = (listId) => {
   setCardItems((prev) => {
     const updated = { ...prev };
     delete updated[listId];
     return updated;
   });
};

const handleDeleteItem = (listId, itemId) => {
   console.log("item", itemId);
   setCardItems((prev) => ({
     ...prev,
     [listId]: prev[listId].filter((item) => item.id !== itemId),
   }));
};

const handleEditItem = (listId, itemId, newContent) => {
   setCardItems((prev) => ({
     ...prev,
     [listId]: prev[listId].map((item) =>
       item.id === itemId ? { ...item, content: newContent } : item
     ),
   }));
};

const handleDragEnd = (event) => {
   const { active, over } = event;
   if (!active || !over) return;

   const sourceId = Object.keys(cardItems).find((cardId) =>
     cardItems[cardId].some((item) => item.id === active.id)
   );
   if (!sourceId || over.id === sourceId) return;

   const movingItem = cardItems[sourceId].find((i) => i.id === active.id);
   setCardItems((prev) => ({
     ...prev,
     [sourceId]: prev[sourceId].filter((i) => i.id !== active.id),
     [over.id]: [...(prev[over.id] || []), movingItem],
   }));
};

const resetBoard = () => {
   setCardItems({});
};

// Sync to localStorage
useEffect(() => {
   localStorage.setItem("cardItems", JSON.stringify(cardItems));
}, [cardItems]);

return (
   <div className="App">
     <Header onReset={resetBoard} />

     <BoardArea
       cardItems={cardItems}
       newListName={newListName}
       setNewListName={setNewListName}
       onAddList={handleAddList}
       onAddItem={handleAddItem}
       onRemoveList={handleRemoveList}
       onDeleteItem={handleDeleteItem}
       onEditItem={handleEditItem}
       onDragEnd={handleDragEnd}
     />

     <Footer />
   </div>
);
}