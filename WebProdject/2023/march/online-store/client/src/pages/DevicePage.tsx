import { FC, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import bigStar from '../accets/img/bigStar.png';
import RatingModal from '../components/modals/RatingModal';
import { addItemBasket } from '../http/basketApi';
import { fetchOneDevice, IOneDeviceApi } from '../http/deviceApi';

const DevicePage: FC = () => {
   const [device, setDevice] = useState<IOneDeviceApi | null>(null);
   const [ratingVisible, setRatingVisible] = useState<boolean>(false);
   const { id } = useParams();

   function addInCart() {
      addItemBasket(Number(id));
   }

   useEffect(() => {
      fetchOneDevice(id).then((data) => setDevice(data));
   }, []);
   return (
      <Container className="mt-3">
         <Row>
            <Col md={4} style={{ overflow: 'hidden' }}>
               <Image
                  width={300}
                  height={300}
                  src={`${process.env.REACT_APP_API_URL || ''}${device?.img || ''}`}
               />
            </Col>
            <Col md={4}>
               <Row className="d-flex flex-column align-items-center">
                  <h2>{device?.name}</h2>
                  <div
                     onClick={() => setRatingVisible(true)}
                     className="d-flex align-items-center justify-content-center"
                     style={{
                        background: `url(${bigStar}) no-repeat center center`,
                        width: 240,
                        height: 240,
                        backgroundSize: 'cover',
                        fontSize: 64,
                        cursor: 'pointer',
                     }}>
                     {device?.rating}
                  </div>
               </Row>
            </Col>
            <Col md={4}>
               <Card
                  className="d-flex flex-column align-items-center justify-content-around"
                  style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightgray' }}>
                  <h3>От: {device?.price} руб.</h3>
                  <Button variant={'outline-dark'} onClick={addInCart}>
                     Добавить в корзину
                  </Button>
               </Card>
            </Col>
         </Row>
         <Row className="mt-4">
            <h2>Характеристики</h2>
            {device?.info.map((info, index) => (
               <Row
                  key={info.id}
                  style={{
                     background: index % 2 === 0 ? 'lightgray' : 'transparent',
                     padding: 10,
                  }}>
                  {info.title}: {info.description}
               </Row>
            ))}
         </Row>
         <RatingModal
            deviceId={device?.id}
            show={ratingVisible}
            onHide={() => setRatingVisible(false)}
         />
      </Container>
   );
};

export default DevicePage;
