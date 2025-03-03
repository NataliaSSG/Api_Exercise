'use client';
import React, { useState } from 'react';
import usePerson from './hooks/usePerson';
import PersonCard from './components/PersonCard';

const PersonPage: React.FC = () => {
  const [userSeed, setUserSeed] = useState<string>('defaultSeed');
  const { person, loading, error } = usePerson(userSeed);

  const handleFetchNewPerson = () => {
    setUserSeed(Math.random().toString(36).substring(7));
  };

  return (
    <div>
      <h1>Person Card</h1>
      <button onClick={handleFetchNewPerson}>Fetch New Person</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {person && <PersonCard person={person} />}
    </div>
  );
};

export default PersonPage;