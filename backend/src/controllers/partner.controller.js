export const getAvailableOrders = async (req, res) => {
  res.json({
    success: true,
    message: "Get Available Orders API",
  });
};

export const acceptOrder = async (req, res) => {
  res.json({
    success: true,
    message: "Accept Order API",
  });
};

export const pickedUpOrder = async (req, res) => {
  res.json({
    success: true,
    message: "Picked Up API",
  });
};

export const deliveredOrder = async (req, res) => {
  res.json({
    success: true,
    message: "Delivered API",
  });
};
