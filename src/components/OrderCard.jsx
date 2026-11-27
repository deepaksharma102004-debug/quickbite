import { STATUS_STEPS, STEP_SECONDS } from "../constants";

export default function OrderCard({ order, now }) {
  // order ko bane hue kitne second hue, uske hisaab se step nikalo
  const elapsed = (now - new Date(order.date).getTime()) / 1000;
  const currentStep = Math.min(
    Math.max(Math.floor(elapsed / STEP_SECONDS), 0),
    STATUS_STEPS.length - 1
  );
  const delivered = currentStep === STATUS_STEPS.length - 1;

  return (
    <div className="order-card">
      <div className="order-top">
        <div>
          <h3>Order #{String(order.id).slice(-6)}</h3>
          <p className="muted">
            {new Date(order.date).toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>
        <span className={delivered ? "badge delivered" : "badge"}>
          {STATUS_STEPS[currentStep]}
        </span>
      </div>

      <div className="tracker">
        {STATUS_STEPS.map((label, index) => {
          const done = index <= currentStep;
          const current = index === currentStep && !delivered;
          return (
            <div
              key={label}
              className={`track-step${done ? " done" : ""}${current ? " current" : ""}`}
            >
              <div className="dot">{done ? "✓" : index + 1}</div>
              <span>{label}</span>
            </div>
          );
        })}
      </div>

      <div className="order-items">
        {order.items.map((item) => (
          <div className="summary-row" key={item.id}>
            <span>{item.name} × {item.qty}</span>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}
        <div className="summary-row grand">
          <span>Total paid</span>
          <span>₹{order.total}</span>
        </div>
      </div>

      <p className="muted order-address">
        📍 {order.customer.name}, {order.customer.phone}, {order.customer.address}
      </p>
    </div>
  );
}