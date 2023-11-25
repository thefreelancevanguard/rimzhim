export const uploadImage = async (event) => {
  const file = event.target.files[0];
  const base64 = await convertIntoBase64(file);
  return base64;
};

export const convertIntoBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (err) => {
      reject(err);
    };
  });
};
