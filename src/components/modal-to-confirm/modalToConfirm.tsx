import { Button } from "react-bootstrap";
import * as S from "./modalToConfirm.styles";
import { useEffect } from "react";

type ModalProps = {
 modalState: boolean;
 closeModal: () => void;
 callback: (confirmed: boolean, id: number) => void;
 modalProps: {
  id: number;
  title: string;
 };
};

export function ModalToConfirm({
 modalProps,
 modalState,
 closeModal,
 callback,
}: ModalProps) {


 const handleConfirm = () => {
  callback(true, modalProps.id);
 };

 useEffect(() => {
  if (modalState) {
   document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
 }, [modalState]);

 return (
  <>
   {modalState && (
    <S.Backdrop onClick={closeModal}>
     <S.Container>
      <b>Deseja realmente excluir?</b>
      <br />
      <p>
       <b>ID:</b> {modalProps.id}
       <br />
       <b>Título:</b> {modalProps.title}
      </p>
      <S.Buttons>
       <Button variant="success" onClick={handleConfirm}>
        Confirmar
       </Button>
       <Button variant="danger" onClick={closeModal}>
        Fechar
       </Button>
      </S.Buttons>
     </S.Container>
    </S.Backdrop>
   )}
  </>
 );
}
