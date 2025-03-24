const CalculateTotalQuantity =  (bill) => {
  const products = bill.billproducts;
      let totalQty = 0;

      products.forEach(el => {
        totalQty += el.qty || 0;
      });

      return totalQty;
  };
  
  export default CalculateTotalQuantity;
  