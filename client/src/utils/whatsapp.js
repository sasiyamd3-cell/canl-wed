export const sendWhatsAppOrder = (items) => {
  const phone = "94726442818";
  
  let message = `*🛒 NEW ORDER - BEST HAND*%0A%0A`;
  let total = 0;

  items.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    message += `*${index + 1}. ${item.name}*%0A`;
    message += `   Price: Rs. ${item.price.toLocaleString()}%0A`;
    message += `   Qty: ${item.quantity}%0A`;
    message += `   Subtotal: Rs. ${itemTotal.toLocaleString()}%0A%0A`;
  });

  message += `*💰 TOTAL: Rs. ${total.toLocaleString()}*%0A%0A`;
  message += `Please confirm my order. Thank you! 🙏`;

  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
};

export const sendSingleOrder = (product, quantity = 1) => {
  sendWhatsAppOrder([{ ...product, quantity }]);
};
