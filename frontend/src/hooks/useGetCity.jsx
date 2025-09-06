import { useEffect } from "react";
import { useDispatch } from "react-redux";
const geoApiKey = import.meta.env.VITE_GEOAPIFY;
function getCity() {
  const dispatch = useDispatch();
  var requestOptions = {
    method: "GET",
  };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const res = await fetch(
              `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${geoApiKey}`,
              requestOptions
            );
            const data = await res.json();
            console.log(data.features[0].properties.city);
            dispatch({type:"User/setCity",payload:data.features[0].properties.city});
          });
      }, []);
}

export default getCity;
