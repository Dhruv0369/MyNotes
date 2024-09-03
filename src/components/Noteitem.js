import React, { useState, useContext } from 'react';
import noteContext from "../context/notes/noteContext";
import { toast } from 'sonner'; // Import Sonner toast

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDeleteClick = () => {
        // Show confirmation dialog
        setShowConfirm(true);
    };

    const confirmDelete = async () => {
        // Delete the note
        await deleteNote(note._id);
        toast.success('Successfully Deleted Note!'); // Show success message
        setShowConfirm(false); // Hide confirmation modal
    };

    const cancelDelete = () => {
        // Hide confirmation dialog
        setShowConfirm(false);
    };

    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        {/* Trigger confirmation */}
                        <i className="far fa-trash-alt mx-2" onClick={handleDeleteClick}></i>
                        <i className="far fa-edit mx-2" onClick={() => { updateNote(note) }}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                    
                    {/* Custom Confirmation Modal */}
                    {showConfirm && (
                        <div className="confirm-box">
                            <p>Are you sure you want to delete this note?</p>
                            <button onClick={confirmDelete} className="btn btn-danger mx-2">Yes</button>
                            <button onClick={cancelDelete} className="btn btn-secondary mx-2">No</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Noteitem;
