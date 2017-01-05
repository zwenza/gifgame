import React from 'react'
import { Modal, Button } from 'react-bootstrap'

/**
 * shows a simple confirm dialog with two buttons
 * props:
 *  show: if dialog should be visible or not
 *  title: html element of modal title
 *  confirm: action to trigger if confirm button was clicked
 *  cancel: action to trigger if cancel button was clicked
 *  confirmLabel: label of the confirm button
 *  cancelLabel: label of the cancel button
 */
export const ConfirmModal = (props) => (
  <Modal show={props.show} onHide={props.cancel}>
    <Modal.Header closeButton>
      <Modal.Title>{props.title}</Modal.Title>
    </Modal.Header>

    <Modal.Footer>
      <Button bsStyle="primary" onClick={props.confirm}>{props.confirmLabel}</Button>
      <Button bsStyle="danger" onClick={props.cancel}>{props.cancelLabel}</Button>
    </Modal.Footer>
  </Modal>
)

/**
 * shows a simple one-button action dialog
 * props:
 *  show: if dialog should be visible or not
 *  title: html element of modal title
 *  action: action to trigger if button was clicked
 *  actionLabel: label of the action button
 */
export const ActionModal = (props) => {
  <Modal show={props.show} onHide={props.action}>
    <Modal.Header closeButton>
      <Modal.Title>{props.title}</Modal.Title>
    </Modal.Header>

    <Modal.Footer>
      <Button bsStyle="danger" onClick={props.action}>{props.actionLabel}</Button>
    </Modal.Footer>
  </Modal>
}
