import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

export default function List(props) {
    const items = props.cards.map(item => {
        console.log(`item`, item)
        return (
          <tr key={item.id}>
            <th scope="row"><img src={item.imageUrl} alt={item.title} /></th>
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td>
              <div style={{width:"110px"}}>
                <ModalForm buttonLabel="Edit" item={item} updateCard={props.updateCard}/>
                {' '}
                <Button color="danger" onClick={() => props.deleteCard(item.id)}>Del</Button>
              </div>
            </td>
          </tr>
          )
        })
  
    return (
        <Table responsive hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {items.map(el=>el)}
        </tbody>
      </Table>
    )
}
