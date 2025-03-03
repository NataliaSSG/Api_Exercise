import { useState, useEffect } from 'react';

interface PersonData {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string;
  };
  email: string;
  login: {
    username: string;
    password: string;
  };
  dob: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

interface UsePersonReturn {
  person: PersonData | null;
  loading: boolean;
  error: string | null;
}

const usePerson = (user: string): UsePersonReturn => {
  const [person, setPerson] = useState<PersonData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchPerson = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://randomuser.me/api/?results=5000}`);

        if (!response.ok) {
          throw new Error('User not found');
        }

        const data = await response.json();
        setPerson(data.results[0]);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [user]);

  return { person, loading, error };
};

export default usePerson;