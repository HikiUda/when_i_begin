import { FC, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createType } from '../../http/deviceApi';

export interface ModalProps {
   show: boolean;
   onHide: () => void;
}

const CreateType: FC<ModalProps> = ({ show, onHide }) => {
   const [value, setValue] = useState<string>('');
   function addType() {
      createType(value).then((data) => setValue(''));
      onHide();
   }

   return (
      <Modal
         size="lg"
         show={show}
         onHide={onHide}
         aria-labelledby="contained-modal-title-vcenter"
         centered>
         <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Добавить тип</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form>
               <Form.Control
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={'Введите название типа'}
               />
            </Form>
         </Modal.Body>
         <Modal.Footer>
            <Button variant={'outline-danger'} onClick={onHide}>
               Выйти
            </Button>
            <Button variant={'outline-success'} onClick={addType}>
               Добавить
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default CreateType;
