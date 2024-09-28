const Bill = require("../Models/BillModel");

const generateBillNumber = async () => {
  const billNumber = Math.round(Math.random() * 9999);

  const bill = await Bill.exists({ bill_number: billNumber });
  
  if (bill) {
    generateBillNumber();
  }

  return billNumber;
};

module.exports = generateBillNumber;
