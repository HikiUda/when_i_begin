import { FC, useContext, useState, useEffect } from 'react';
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';
import { Context } from '../..';
import { ModalProps } from './CreateType';
import { createDevices, fetchBrands, fetchTypes, IOneDeviceApi } from '../../http/deviceApi';

const CreateDevice: FC<ModalProps> = ({ show, onHide }) => {
   useEffect(() => {
      fetchTypes().then((data) => context?.device.setTypes(data));
      fetchBrands().then((data) => context?.device.setBrands(data));
   }, []);

   const context = useContext(Context);
   const [name, setName] = useState<string>('');
   const [price, setPrice] = useState<number>(0);
   const [file, setFile] = useState<any>(null);
   const [brandId, setBrand] = useState<number | null>(null);
   const [typeId, setType] = useState<number | null>(null);
   const [info, setInfo] = useState<any[]>([]);

   const selectedFile = (e: any) => {
      setFile(e.target.files[0]);
   };

   const addInfo = () => {
      setInfo([...info, { title: '', description: '', number: Date.now() }]);
   };
   const removeInfo = (number: number) => {
      setInfo(info.filter((i) => i.number !== number));
   };
   const changeInfo = (key: string, value: string, number: any) => {
      setInfo(info.map((i) => (i.number === number ? { ...i, [key]: value } : i)));
   };
   function addDevice() {
      if (name && price && brandId && typeId && file) {
         const formData = new FormData();
         formData.append('name', name);
         formData.append('price', `${price}`);
         formData.append('img', file);
         formData.append('brandId', `${brandId}`);
         formData.append('typeId', `${typeId}`);
         formData.append('info', JSON.stringify(info));

         createDevices(formData).then((data) => {
            setName('');
            setPrice(0);
            setBrand(null);
            setType(null);
            setFile(null);
            setInfo([]);
            onHide();
            //console.log(data);
         });
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
            <Modal.Title id="contained-modal-title-vcenter">Добавить устройство</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <>
               <Dropdown className="mb-3">
                  <Dropdown.Toggle>
                     {context?.device.types.find((type) => type.id === typeId)?.name ||
                        'Выберите тип'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                     {context?.device.types.map((type) => (
                        <Dropdown.Item onClick={() => setType(type.id)} key={type.id}>
                           {type.name}
                        </Dropdown.Item>
                     ))}
                  </Dropdown.Menu>
               </Dropdown>
               <Dropdown className="mb-3">
                  <Dropdown.Toggle>
                     {context?.device.brands.find((brand) => brand.id === brandId)?.name ||
                        'Выберите бренд'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                     {context?.device.brands.map((brand) => (
                        <Dropdown.Item onClick={() => setBrand(brand.id)} key={brand.id}>
                           {brand.name}
                        </Dropdown.Item>
                     ))}
                  </Dropdown.Menu>
               </Dropdown>
               <Form className="mb-3">
                  <Form.Control
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     placeholder={'Введите название устройства'}
                  />
               </Form>
               <Form className="mb-3">
                  <Form.Control
                     value={price}
                     onChange={(e) => setPrice(Number(e.target.value))}
                     type="number"
                     placeholder={'Введите цену'}
                  />
               </Form>
               <Form className="mb-3">
                  <Form.Control onChange={selectedFile} type="file" />
               </Form>
               <hr />
               <Button variant={'outline-dark'} onClick={addInfo} className="mb-3">
                  Добавить новое свойство
               </Button>
               {info.map((i) => {
                  return (
                     <Row key={i.number} className="mb-3">
                        <Col md={4}>
                           <Form.Control
                              value={i.title}
                              onChange={(e) => changeInfo('title', e.target.value, i.number)}
                              placeholder="Введите название свойства"
                           />
                        </Col>
                        <Col md={4}>
                           <Form.Control
                              value={i.description}
                              onChange={(e) => changeInfo('description', e.target.value, i.number)}
                              placeholder="Введите описание свойства"
                           />
                        </Col>
                        <Col md={4}>
                           <Button variant={'outline-danger'} onClick={() => removeInfo(i.number)}>
                              Удалить
                           </Button>
                        </Col>
                     </Row>
                  );
               })}
            </>
         </Modal.Body>
         <Modal.Footer>
            <Button variant={'outline-danger'} onClick={onHide}>
               Выйти
            </Button>
            <Button variant={'outline-success'} onClick={addDevice}>
               Добавить
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default CreateDevice;
