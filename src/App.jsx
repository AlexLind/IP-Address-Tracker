import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "./App.css";

function App() {
  const [ip, setIp] = useState("");
  const [location, setLocation] = useState({});
  const [timezone, setTimezone] = useState("");
  const [isp, setIsp] = useState("");
  const [center, setCenter] = useState([51.505, -0.09]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const ipRegex = new RegExp(
      "^([0-9]{1,3}\\.){3}[0-9]{1,3}$|^([a-zA-Z0-9]+\\.)+[a-zA-Z0-9]+$"
    );
    if (ipRegex.test(e.target[0].value)) {
      console.log("Valid IP address or domain");
    } else {
      console.log("Invalid IP address or domain");
      return;
    }
    console.log(coordinates);
    setIp(e.target[0].value);
  };

  // Get clients ip address from ipify API and set state variables with the data returned from the API call to ipify API
  useEffect(() => {
    const getIp = async () => {
      const response = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_b5zYcEkWq4qJhRRhqivxuwToUzwQb&ipAddress=${ip}`
      );
      const data = await response.json();
      console.log(data);
      setCenter([data.location.lat, data.location.lng]);
      setIp(data.ip);
      setLocation(data.location);
      setTimezone(data.location.timezone);
      setIsp(data.isp);
    };
    getIp();
  }, [ip]);

  return (
    <div className="App">
      <header className="App-header">
        <h3>IP Address Tracker</h3>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search for any IP address or domain"
          />
          <button type="submit">
            <p>{">"}</p>
          </button>
        </form>
      </header>
      {ip ? (
        <div className="ip-container">
          <div className="ip">
            <p>IP ADDRESS</p>
            <h4>{ip}</h4>
          </div>
          <div className="location">
            <p>LOCATION</p>
            <h4>
              {`${location.city}, ${location.region}`} <br />{" "}
              {`${location.postalCode}, ${location.country}`}
            </h4>
          </div>
          <div className="timezone">
            <p>TIMEZONE</p>
            <h4>{timezone}</h4>
          </div>
          <div className="isp">
            <p>ISP</p>
            <h4>{isp}</h4>
          </div>
        </div>
      ) : null}
      <main>
        <div id="map">
          {center ? (
            <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={center}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default App;
