import React from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'


export default function EditCard(props) {
    return (
        <Modal>
            <a href="#" onClick="props.setEdit(true)"></a>
        </Modal>
    )
}
