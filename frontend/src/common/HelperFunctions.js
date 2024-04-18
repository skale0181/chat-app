/**
 * this file contains all the global helper functions
 */

//validate email
export const validateEmail = (email) => {
    // Regular expression pattern for a valid email address
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Use test method to match the pattern against the email address
    return pattern.test(email);
};

//validate password
export const validatePassword = (password) => {
  // Check password length
  if (password.length < 8) {
    return false;
  }
  // Check if password has a mix of uppercase, lowercase letters, numbers and symbols
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// compare with current date
export const isSameDate = (dateString) => {
  const dateToCompare = new Date(dateString);
  const today = new Date();

  return (
    dateToCompare.getUTCFullYear() === today.getUTCFullYear() &&
    dateToCompare.getUTCMonth() === today.getUTCMonth() &&
    dateToCompare.getUTCDate() === today.getUTCDate()
  );
};

//format date
export const formatDateFunction = (
  inputDate,
  format = "dd/mm/yyyy",
  time = false,
  onlyTime = false
) => {
  const date = new Date(inputDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  let timeOfDate = ``;
  if (time) {
    let hours = date.getHours();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format
    const minutes = date.getMinutes().toString().padStart(2, "0");
    timeOfDate = ` ${hours}:${minutes} ${amOrPm}`;
  }

  if (onlyTime) {
    return timeOfDate;
  }

  if (format === "dd/mm/yyyy") {
    if (time) return `${day}/${month}/${year}, ${timeOfDate}`;
    return `${day}/${month}/${year}`;
  } else if (format === "yyyy-mm-dd") {
    if (time) return `${year}-${month}-${day}, ${timeOfDate}`;
    return `${year}-${month}-${day}`;
  } else if (format === "mm/dd/yyyy") {
    if (time) return `${month}/${day}/${year}, ${timeOfDate}`;
    return `${month}/${day}/${year}`;
  }
};

//convert image to base64
export const image_to_base64 = async (file) => {
  let result_base64 = await new Promise((resolve) => {
    let fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = (error) => {
      console.error(error);
      // alert("An Error occurred please try again, File might be corrupt");
    };
    fileReader.readAsDataURL(file);
  });
  return result_base64;
};

//compress base64 image
export const reduce_image_file_size = async (
  base64Str,
  MAX_WIDTH = 650,
  MAX_HEIGHT = 650
) => {
  let resized_base64 = await new Promise((resolve) => {
    let img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;
      let ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL()); // this will return base64 image results after resize
    };
  });
  return resized_base64;
};

///manage image cropper
export const handleUploadImage = async (file) => {
  const original = file; //already base64
  //compressed image file
  let compressed = await reduce_image_file_size(original);
  //find the size of the original and compressed file
  const binaryDataCompressed = atob(compressed.split(",")[1]);
  const fileSizeMBCompressed = (
    binaryDataCompressed?.length /
    (1024 * 1024)
  ).toFixed(2);
  if (fileSizeMBCompressed <= 5) {
    // setselect_img(null);
    // await setExistingImages([...existingImages, singleImgObj]);
    return { res: "success", data: compressed };
  } else {
    return { res: "error", data: "File size should be less than 5MB" };
  }
};
