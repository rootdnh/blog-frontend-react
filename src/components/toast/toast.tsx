import { Toast, ToastContainer } from "react-bootstrap";

interface StandardToastProps {
  showToast: boolean, 
  message: string, 
  closeToast: ()=> void
}

export function StandardToast({showToast, message, closeToast}: StandardToastProps){
  return(
    <ToastContainer className="p-3" position="top-end" style={{ zIndex: 9999 }}>
    <Toast
     bg="light"
     onClose={closeToast}
     show={showToast}
     delay={3500}
     autohide
    >
     <Toast.Header >
      <strong className="me-auto">Aviso</strong>
     </Toast.Header>
     <Toast.Body><b>{message || ""}</b></Toast.Body>
    </Toast>
   </ToastContainer>
  )
}