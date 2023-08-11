import  { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useProductStore } from '../data/stores/useProductStore';
import StoreItem from '../components/StoreItem';

const Store = () => {
  const products = useProductStore((state) => state.products);
  const getProducts = useProductStore((state) => state.getProducts);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className='g-3'>
        {products.map((product) => (
          <Col key={product.id}>
           <StoreItem {...product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Store;
