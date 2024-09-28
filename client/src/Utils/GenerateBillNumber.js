const GenerateBillNumber =  () => {
  const billNumber = Math.round(Math.random() * 9999);

  return billNumber;
};

export default GenerateBillNumber;
