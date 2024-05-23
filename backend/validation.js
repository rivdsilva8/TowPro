export const isValidLatitude = (lat) => {
  return !isNaN(parseFloat(lat)) && lat >= -90 && lat <= 90;
};

export const isValidLongitude = (lng) => {
  return !isNaN(parseFloat(lng)) && lng >= -180 && lng <= 180;
};

export const isValidHeader = (header) => {
  return !isNaN(parseFloat(header)) && header >= 0 && header <= 360;
};
