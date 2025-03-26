import React, { useState } from "react";

const usePreviewImage = () => {
  const [previewImage, SetPreviewImage] = useState("https://tse1.mm.bing.net/th?id=OIP.kEKWG9WO-kIzLXqm6_khxgHaFS&pid=Api&P=0&h=180");
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    SetPreviewImage(URL.createObjectURL(file));
  };

  return { previewImage, handleFileChange };
};

export default usePreviewImage;
