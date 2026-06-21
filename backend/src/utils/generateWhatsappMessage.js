export const generateWhatsappMessage = (orders) => {
  let message = "🍽️ New Orders\n\n";

  let grandTotal = 0;

  message += `👤 Customer: ${orders[0].customerName}\n`;
  message += `📞 Phone: ${orders[0].customerPhone}\n\n`;

  orders.forEach((order, index) => {
    message += `🏪 Restaurant ${index + 1}: ${order.restaurantName}\n`;

    message += `🆔 Order ID: ${order._id}\n`;

    message += "🛒 Items:\n";

    order.items.forEach((item) => {
      message += `• ${item.name} x ${item.quantity}\n`;
    });

    message += `💰 Total: ₹${order.totalAmount}\n\n`;

    // 👉 ADD TO GRAND TOTAL
    grandTotal += order.totalAmount;
  });

  message += `📦 GRAND TOTAL: ₹${grandTotal}\n\n`;

  message += `📍 Address:\n${orders[0].address}\n\n`;
  message += `💳 Payment: ${orders[0].paymentMethod}`;

  return message;
};