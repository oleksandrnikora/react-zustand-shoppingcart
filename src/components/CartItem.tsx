import { useCartStore } from '../data/stores/useCartStore';
import { useProductStore } from '../data/stores/useProductStore';
import { Button, Stack } from 'react-bootstrap';
import { formatCurrency } from '../utilities/formatCurrency';

type CartItemsProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItemsProps) => {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const products = useProductStore((state) => state.products);

  const item = products.find((i) => i.id === id);

  if (item == null) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
    <img
      src={item.image}
      style={{ width: "125px", height: "75px", objectFit: "cover" }}
    />
    <div className="me-auto">
      <div style={{ fontSize: ".65rem" }}>
        {item.title}{" "}
        {quantity > 1 && (
          <span className="text-muted" style={{ fontSize: ".65rem" }}>
            x{quantity}
          </span>
        )}
      </div>
      <div className="text-muted" style={{ fontSize: ".75rem" }}>
        {formatCurrency(item.price)}
      </div>
    </div>
    <div style={{ fontSize: ".75rem" }}> {formatCurrency(item.price * quantity)}</div>
    <Button
      variant="outline-danger"
      size="sm"
      onClick={() => removeFromCart(item.id)}
    >
      &times;
    </Button>
  </Stack>
  );
};

export default CartItem;
