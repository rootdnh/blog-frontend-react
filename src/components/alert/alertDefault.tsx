import { useEffect, useState } from "react";
import { IAlert } from "../../types/utils.types";
import { Alert } from "react-bootstrap";
import "animate.css/animate.css";

interface AlertProps extends IAlert {
 handleHideAlert: () => void;
}

function AlertDefault({ type, isOpen, message, handleHideAlert }: AlertProps) {
 const [open, setOpen] = useState(false);

 useEffect(() => {
  if (isOpen) {
   setOpen(true);

   const time = setTimeout(() => {
    setOpen(false);
    handleHideAlert();
   }, 1500);
   
   return () => clearTimeout(time);
  }
 }, [isOpen]);

 return (
  <>
   {open && (
    <Alert className="mt-3 animate__animated animate__fadeIn" variant={type}>
     {message}
    </Alert>
   )}
  </>
 );
}

export default AlertDefault;
