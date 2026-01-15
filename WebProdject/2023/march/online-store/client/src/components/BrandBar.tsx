import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Card, Row } from 'react-bootstrap';
import { Context } from '..';

const BrandBar = observer(() => {
   const context = useContext(Context);
   return (
      <Row className="d-flex" style={{ gap: 10 }}>
         {context?.device.brands.map((brand) => (
            <Card
               style={{ cursor: 'pointer', maxWidth: 100 }}
               border={brand.id === context?.device.selectedBrand.id ? 'danger' : 'light'}
               onClick={() => context?.device.setSelectedBrand(brand)}
               className="p-2"
               key={brand.id}>
               {brand.name}
            </Card>
         ))}
      </Row>
   );
});

export default BrandBar;
