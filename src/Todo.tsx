import React, { useEffect } from "react";
// import axios from "axios";

import { Modal, Button } from "react-bootstrap";

function Todo(props: any) {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);

  const [todoInput, setTodoInput] = React.useState("");

  useEffect(() => {
    setTodoInput(props.name);
  }, []);

  const handleClose = () => setShowDeleteModal(false);
  const handleShow = () => setShowDeleteModal(true);

  const handleDeleteModal = async (e: any) => {
    handleShow();

    props.deleteTodo(props.id);
    handleClose();
  };

  const handleEditModal = async (e: any) => {
    // setShowEditModal(true);

    props.editTodo(props.id, todoInput);
    setShowEditModal(false);
    // console.log("working");
    // console.log(e);
  };

  return (
    <>
      <div className="shadow-sm p-3 bg-body rounded mt-3 border d-flex">
        <div className="w-100">
          <p
            className={`${
              props.completed && "text-decoration-line-through"
            } todo__text`}
            onClick={() => props.toggleCompleted(props.id)}
          >
            {props.name}
          </p>

          <button
            className="btn btn-sm btn-outline-primary m-1"
            onClick={() => setShowEditModal(true)}
          >
            Edit
          </button>

          <button
            className="btn btn-sm btn-outline-danger  m-1"
            onClick={handleShow}
          >
            Delete
          </button>
        </div>
        <div className="mx-2">
          <input
            type="checkbox"
            // checked={`${props.completed === true ? true : false}`}
            checked={props.completed == true ? true : false}
            onChange={() => props.toggleCompleted(props.id)}
          />
        </div>
      </div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditModal}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal */}
      <Modal show={showDeleteModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteModal}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Todo;
