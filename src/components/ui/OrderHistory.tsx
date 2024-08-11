interface LimitOrder {
  id: string;
  fromChain: string;
  toChain: string;
  fromToken: string;
  toToken: string;
  amount: string;
  limitPrice: string;
  status: "active" | "completed" | "cancelled";
  timestamp: number;
}

interface OrderHistoryProps {
  orders: LimitOrder[];
  onCancelOrder: (orderId: string) => void;
}

export default function OrderHistory({ orders, onCancelOrder }: OrderHistoryProps) {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">Order History</h3>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders placed yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="border border-gray-300 p-4 rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">
                  {order.fromChain} → {order.toChain}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    order.status === "active"
                      ? "bg-green-100 text-green-800"
                      : order.status === "completed"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Selling: {order.amount} {order.fromToken}
              </p>
              <p className="text-sm text-gray-600">
                For: {order.toToken} at {order.limitPrice} {order.toToken}/
                {order.fromToken}
              </p>
              {order.status === "active" && (
                <button
                  onClick={() => onCancelOrder(order.id)}
                  className="mt-3 w-full px-4 py-2 bg-orange-500 text-white font-semibold rounded-full shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-200"
                >
                  Cancel Order
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
