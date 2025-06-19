import React from 'react';
import './location-map.css';

const LocationMap = () => {
  return (
    <div className="map-container">
      <img
        src="https://raw.githubusercontent.com/djaiss/mapsicon/master/bangladesh/bangladesh.png"
        alt="Bangladesh Map"
        style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '10px' }}
      />
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <h3>Our Location</h3>
        <p>Find us at these popular destinations in Bangladesh!</p>
      </div>
    </div>
  );
};

export default LocationMap; 