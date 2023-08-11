import { Offcanvas, Stack } from 'react-bootstrap';
import { useCartStore } from '../data/stores/useCartStore';
import CartItem from './CartItem';
import { useProductStore } from '../data/stores/useProductStore';
import { formatCurrency } from '../utilities/formatCurrency';

const Cart = () => {
  const isOpen = useCartStore((state) => state.isOpen);
  const cartClose = useCartStore((state) => state.closeCart);
  const carts = useCartStore((state) => state.carts);
  const products = useProductStore((state) => state.products);

  return (
    <Offcanvas show={isOpen} onHide={cartClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {carts.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total:{' '}
            {formatCurrency(
              carts.reduce((total, item) => {
                const current = products.find((i) => i.id === item.id);

                return total + (current?.price || 0) * item.quantity;
              }, 0),
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
