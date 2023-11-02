import { useState, useEffect } from 'react';
import axios from 'axios';

type Pet = {
  id: number;
  name: string;
  breed: string;
  age: number;
};

const PetStore = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [petName, setPetName] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petAge, setPetAge] = useState('');

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    const response = await axios.get<Pet[]>('/api/pets');
    setPets(response.data);
  };

  const createPet = async () => {
    await axios.post('/api/pets', {
      name: petName,
      breed: petBreed,
      age: petAge,
    });
    fetchPets();
  };

  const updatePet = async () => {
    if (selectedPet) {
      await axios.put(`/api/pets/${selectedPet.id}`, {
        name: petName,
        breed: petBreed,
        age: petAge,
      });
      fetchPets();
    }
  };

  const deletePet = async (id: number) => {
    await axios.delete(`/api/pets/${id}`);
    fetchPets();
  };

  return (
    <div>
      <h1>Pet Store</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Breed"
          value={petBreed}
          onChange={(e) => setPetBreed(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={petAge}
          onChange={(e) => setPetAge(e.target.value)}
        />
        <button onClick={createPet}>Create Pet</button>
        <button onClick={updatePet}>Update Pet</button>
      </div>
      <div>
        {pets.map((pet) => (
          <div key={pet.id}>
            <h2>{pet.name}</h2>
            <p>{pet.breed}</p>
            <p>{pet.age}</p>
            <button onClick={() => setSelectedPet(pet)}>Edit</button>
            <button onClick={() => deletePet(pet.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetStore;