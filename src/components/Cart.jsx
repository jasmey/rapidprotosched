import "./Cart.css";

const formatPrice = new Intl.NumberFormat([], {
  style: "currency",
  currency: "USD",
}).format;

const Cart = ({ selected, courses }) => {
  console.log(selected);
  console.log(courses);
  return (
    <div className="cart">
      {selected.length === 0 ? (
        <h2>The cart is empty</h2>
      ) : (
        Object.entries(courses).map(([id, course]) => (
          <div key={id}>
            {course.term} CS {course.number} -- {course.title}
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
