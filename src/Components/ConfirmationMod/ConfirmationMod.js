import React from 'react';

function ConfirmationMod({ globalClick, idCard, deleteCard }) {
    return (
        <div className="modal" onClick={globalClick}>
            <div className="conf-container">
                <div className="conf-text-div">Are you sure you e¡want to delete this card?</div>
                <div className="conf-buttons-div">
                    <div><button class="button" onClick={() => deleteCard(idCard)}>CONFIRM</button></div>
                    <div><button class="button" onClick={() => deleteCard(false)}>CANCEL</button></div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationMod;