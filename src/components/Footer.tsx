import React from "react";
import "./Footer.css";

const Footer = () => {
return (
   <footer className="footer">
     <div className="footer-container">
       <p>
         &copy; {new Date().getFullYear()} Your Company. All rights reserved.
       </p>
       <div className="footer-links">
         <a href="">About</a>
         <a href="">Contact</a>
         <a href="">Privacy Policy</a>
       </div>
     </div>
   </footer>
);
};

export default Footer;