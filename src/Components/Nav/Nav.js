import React from 'react'

export default function Nav(props) {
    const orderArr = props.orderArr;
    return (
        <nav className="nav">
            <div className="navButtonDiv"><button data-testid="button-1" className="button navButtons" onClick={() => orderArr("title-desc")}>Title &#11015;</button></div>
            <div className="navButtonDiv"><button data-testid="button-2" className="button navButtons" onClick={() => orderArr("title-asc")}>Title &#11014; </button></div>
            <div className="navButtonDiv"><button data-testid="button-3" className="button  navButtons" onClick={() => orderArr("dateAsc")}>Date &#11015;</button></div>
            <div className="navButtonDiv"><button data-testid="button-4" className="button navButtons" onClick={() => orderArr("dateDesc")}>Date &#11014;</button></div>
        </nav>
    )
}
