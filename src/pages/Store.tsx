import  { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useProductStore } from '../data/stores/useProductStore';
import StoreItem from '../components/StoreItem';

const Store = () => {
  const products = useProductStore((state) => state.products);
  const getProducts = useProductStore((state) => state.getProducts);
  const errorProducts = useProductStore((state) => state.error);
  const isLoading = useProductStore((state) => state.loading);

  console.log(errorProducts)

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  if (errorProducts) {
    return(<h1 className='text-center'>Cannot download data from our servers, check internet connection and try again</h1>)
  }

  return (
    <>
      {isLoading ? (
        <h2 className='text-center'>Loading,please wait...</h2>
      ) : ( 
      <Row md={2} xs={1} lg={3} className='g-3'>
        {products.map((product) => (
          <Col key={product.id}>
           <StoreItem {...product} />
          </Col>
        ))}
      </Row>
      )}
    </>
  );
};

export default Store;
