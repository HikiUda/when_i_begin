import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Context } from '..';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import ShopPages from '../components/ShopPages';
import TypeBar from '../components/TypeBar';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceApi';

const Shop = observer(() => {
   const context = useContext(Context);

   useEffect(() => {
      fetchTypes().then((data) => context?.device.setTypes(data));
      fetchBrands().then((data) => context?.device.setBrands(data));
      let page = context?.device.page;
      let brandId = context?.device.selectedBrand;
      let typeId = context?.device.selectedType;
      let limit = context?.device.limit;
      fetchDevices(typeId?.id, brandId?.id, page, limit).then((data) => {
         context?.device.setDevices(data.rows);
         context?.device.setTotalCount(data.count);
      });
   }, [context?.device.selectedBrand, context?.device.selectedType, context?.device.page]);

   return (
      <Container>
         <Row className={'mt-2'}>
            <Col md={3}>
               <TypeBar />
            </Col>
            <Col md={9}>
               <BrandBar />
               <DeviceList />
               <ShopPages />
            </Col>
         </Row>
      </Container>
   );
});

export default Shop;
