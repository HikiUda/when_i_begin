import { FC, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createBrand } from '../../http/deviceApi';
import { ModalProps } from './CreateType';

const CreateBrand: FC<ModalProps> = ({ show, onHide }) => {
   const [value, setValue] = useState<string>('');
   function addBrand() {
      createBrand(value).then((data) => setValue(''));
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
            <Modal.Title id="contained-modal-title-vcenter">Добавить бренд</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form>
               <Form.Control
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={'Введите название бренда'}
               />
            </Form>
         </Modal.Body>
         <Modal.Footer>
            <Button variant={'outline-danger'} onClick={onHide}>
               Выйти
            </Button>
            <Button variant={'outline-success'} onClick={addBrand}>
               Добавить
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default CreateBrand;
