import { Button, Modal, Pagination } from 'react-bootstrap';
import { FC, useEffect, useState } from 'react';
import { ModalProps } from './CreateType';
import { deleteRating, getRating, updateRating } from '../../http/ratingApi';

interface ModalRatingPrors extends ModalProps {
   deviceId: number | undefined;
}

const RatingModal: FC<ModalRatingPrors> = ({ show, onHide, deviceId }) => {
   const [active, setActive] = useState<number>(0);

   useEffect(() => {
      if (deviceId) {
         getRating(deviceId).then((res) => setActive(res.data?.rate));
      }
   }, [deviceId]);

   function sendRate() {
      if (deviceId) {
         if (!active) {
            onHide();
            return;
         }
         updateRating(deviceId, active);
         onHide();
      }
   }
   function removeRate() {
      if (deviceId) {
         deleteRating(deviceId);
         onHide();
         setActive(0);
      }
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
            <Pagination>
               {[1, 2, 3, 4, 5].map((rate) => (
                  <Pagination.Item
                     onClick={() => setActive(rate)}
                     key={rate}
                     active={rate === active}>
                     {rate}
                  </Pagination.Item>
               ))}
            </Pagination>
         </Modal.Body>
         <Modal.Footer>
            <Button onClick={sendRate}>Отправить</Button>
            <Button variant={'outline-danger'} onClick={removeRate}>
               Убрать оценку
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default RatingModal;
