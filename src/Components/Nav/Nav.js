import React from 'react'

export default function Nav(props) {
    const orderArr = props.orderArr;
    return (
        <nav className="nav">
            <div className="navButtonDiv"><button className="button navButtons" href="#" onClick={() => orderArr("title-desc")}>Title &#11015;</button></div>
            <div className="navButtonDiv"><button href="#" className="button navButtons" onClick={() => orderArr("title-asc")}>Title &#11014; </button></div>
            <div className="navButtonDiv"><button href="#" className="button  navButtons" onClick={() => orderArr("dateAsc")}>Date &#11015;</button></div>
            <div className="navButtonDiv"> <button href="#" className="button navButtons" onClick={() => orderArr("dateDesc")}>Date &#11014;</button></div>
        </nav>
    )
}
