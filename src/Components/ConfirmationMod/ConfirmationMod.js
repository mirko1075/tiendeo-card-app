import React from 'react';

function ConfirmationMod({ globalClick, idCard, deleteCard }) {
    return (
        <div className="modal" onClick={globalClick}>
            <div className="conf-container">
                <div className="conf-text-div">Do you really want to delete this card?</div>
                <div className="conf-buttons-div">
                    <div><button data-testid="confirm" className="button" onClick={() => deleteCard(idCard)}>CONFIRM</button></div>
                    <div><button data-testid="cancel" className="button" onClick={() => deleteCard(false)}>CANCEL</button></div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationMod;