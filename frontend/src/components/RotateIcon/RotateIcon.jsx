import { Icon } from "leaflet";

const RotateIcon = ({ rotationAngle }) => {
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1417/1417847.png",
    iconSize: [38, 38],
    iconAnchor: [19, 19], // Adjust the icon anchor if needed
    rotationAngle: rotationAngle,
  });

  return customIcon;
};

export default RotateIcon;
