export const isValidLatitude = (lat) => {
  return !isNaN(parseFloat(lat)) && lat >= -90 && lat <= 90
}

export const isValidLongitude = (lon) => {
  return !isNaN(parseFloat(lon)) && lon >= -180 && lon <= 180
}

export const isValidHeader = (heading) => {
  return !isNaN(parseFloat(heading)) && heading >= 0 && heading <= 360
}
