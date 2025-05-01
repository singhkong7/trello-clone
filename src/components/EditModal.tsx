import React, { useState } from "react";
import ReactDOM from "react-dom";

export default function EditModal({ initialContent, onSave, onCancel }) {
const [value, setValue] = useState(initialContent);

return ReactDOM.createPortal(
   <div
     style={{
       position: "fixed",
       top: 0,
       left: 0,
       right: 0,
       bottom: 0,
       backgroundColor: "rgba(0,0,0,0.3)",
       display: "flex",
       alignItems: "center",
       justifyContent: "center",
     }}
   >
     <div
       style={{
         backgroundColor: "white",
         padding: 20,
         borderRadius: 8,
         width: 300,
       }}
     >
       <h3>Edit Item</h3>
       <input
         type="text"
         value={value}
         onChange={(e) => setValue(e.target.value)}
         style={{ width: "100%", marginBottom: 10, padding: 8 }}
       />
       <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
         <button onClick={onCancel}>Cancel</button>
         <button onClick={() => onSave(value)}>Save</button>
       </div>
     </div>
   </div>,
   document.body
);
}