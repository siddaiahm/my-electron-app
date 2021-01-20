import React from 'react';
import {
    Link
  } from "react-router-dom";

function NavBar(){
    return (
        <div style={styles.navBar}>
          
              <Link to="/" style={styles.li}>Theme 0</Link>

            
              <Link to="/theme1" style={styles.li}>Theme 1</Link>
              <Link to="/theme2" style={styles.li}>Theme 2</Link>
       </div>
    );
}

let styles = {
navBar:{
    display:"flex",
    justifyContent:"space-between"
},
li:{
    textDecoration:"none",
    padding:15,
    margin:1,
    flex:1,
    backgroundColor:"grey",
    color:"white"
}
}
export default NavBar;