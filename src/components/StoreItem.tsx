import { StoreItemProps } from '../types/StoreItemProps';
import { Button, Card } from 'react-bootstrap';
import { formatCurrency } from '../utilities/formatCurrency';
import { useCartStore } from '../data/stores/useCartStore';

const StoreItem = ({ id, title, price, image, description }: StoreItemProps) => {
  const carts = useCartStore((state) => state.carts);
  const getItemQuantity = useCartStore((state) => state.getItemQuantity);
  const increaseCartQuantity = useCartStore((state) => state.increaseCartQuantity);
  const decreaseCartQuantity = useCartStore((state) => state.decreaseCartQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  console.log(carts);

  const quantity = getItemQuantity(id);

  return (
    <Card className="h-100">
      <div className="text-center">
        <Card.Img variant="top" src={image} style={{ width: '100px', height: '130px' }} />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-center d-flex justify-content-center">
          <span className="fs-2">{title}</span>
        </Card.Title>
        <Card.Text className="ms-2 text-center" >
          {description}
        </Card.Text>
        <div className="mt-auto">
          {quantity === 0 ? (
            <div className='d-flex align-items-center justify-content-between'>
              <Card.Text
                style={{ color: '#008080', fontWeight: 'bold' }}>
                {formatCurrency(price)}
              </Card.Text>
              <Button onClick={() => increaseCartQuantity(id)}>+ Add To Cart</Button>
            </div>
          ) : (
            <div className="d-flex align-items-center flex-column" style={{ gap: '.5rem' }}>
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: '.5rem' }}>
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button variant="danger" size="sm" onClick={() => removeFromCart(id)}>
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
