import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Pagination } from 'react-bootstrap';
import { Context } from '..';

const ShopPages = observer(() => {
   const context = useContext(Context);
   //@ts-ignore
   const pageCount = Math.ceil(context?.device.totalPage / context?.device.limit);
   const pages = [];

   for (let i = 0; i < pageCount; i++) {
      pages.push(i + 1);
   }
   return (
      <Pagination className="mt-5">
         {pages.map((page) => (
            <Pagination.Item
               active={context?.device.page === page}
               key={page}
               onClick={() => context?.device.setPage(page)}>
               {page}
            </Pagination.Item>
         ))}
      </Pagination>
   );
});

export default ShopPages;
