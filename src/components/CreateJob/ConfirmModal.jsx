import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CircularProgress } from "@mui/material";
function ConfirmModal({
  show,
  handleClose,
  cancelOrder,
  confirmOrder,
  loading,
  formRef,
  cost,
}) {
  return (
    <>
      <Modal
        show={show}
        onHide={cancelOrder}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center" }}>
            {loading ? "Estimating Cost...." : "Confirm Or Cancel Order"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </div>
          ) : (
            <div>
              <div>
                <span style={{ fontWeight: "bold" }}>On : </span>
                {formRef?.current?.deliveryDate?.value}
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>Copies : </span>
                {formRef?.current?.numberOfCopies?.value}
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>Size : </span>
                {formRef?.current?.sizeOfPaper?.value}
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>Type : </span>
                {formRef?.current?.typeOfCopy?.value}
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>Instruction : </span>
                {formRef?.current?.additionalInstruction?.value || "NILL"}
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}>Cost : ₹</span>
                {cost}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={cancelOrder}>
            Cancel
          </Button>
          {!loading && (
            <Button variant="success" onClick={confirmOrder}>
              Confirm
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModal;
