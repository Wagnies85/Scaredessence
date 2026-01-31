import React, { useState } from 'react';

const ProfileForm = ({ onSubmit }) => {
  const [profile, setProfile] = useState({
    date: '',
    time: '',
    latitude: '',
    longitude: '',
    timezone: '',
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(profile);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        name="date"
        value={profile.date}
        onChange={handleChange}
      />
      <input
        type="time"
        name="time"
        value={profile.time}
        onChange={handleChange}
      />
      <input
        type="text"
        name="latitude"
        placeholder="Latitude"
        value={profile.latitude}
        onChange={handleChange}
      />
      <input
        type="text"
        name="longitude"
        placeholder="Longitude"
        value={profile.longitude}
        onChange={handleChange}
      />
      <input
        type="text"
        name="timezone"
        placeholder="Timezone"
        value={profile.timezone}
        onChange={handleChange}
      />
      <button type="submit">Save & Get Charts</button>
    </form>
  );
};

export default ProfileForm;