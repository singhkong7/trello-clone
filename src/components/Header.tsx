import React from "react";

export default function Header({ onReset }) {
return (
   <header className="header_container">
     <h1>Torello Clone</h1>
     <button onClick={onReset} className="header_container_button">
       <p>Reset Board</p>
     </button>
   </header>
);
}