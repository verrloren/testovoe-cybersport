'use client';
import { useEffect, useState } from 'react';

interface FormData {
  name: string;
  surname: string;
  date: string;
	teamId: string;
  selectedCard: { name: string };
}

export default function TarotResultPage() {
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const name = query.get('name');
    const surname = query.get('surname');
    const date = query.get('date');
    const teamId = query.get('team');
    const selectedCard = query.get('selectedCard');

    if (name && surname && date && selectedCard && teamId) {
      setFormData({
        name,
        surname,
        date,
				teamId,
        selectedCard: JSON.parse(selectedCard),
      });
    }
  }, []);

  return (
    <div>
      <h1>Tarot Result Page</h1>
      {formData && (
        <div>
          <p className='text-white'>Name: {formData.name}</p>
          <p className='text-white'>Surname: {formData.surname}</p>
          <p className='text-white'>Date: {formData.date}</p>
          <p className='text-white'>Team: {formData.teamId}</p>
          <p className='text-white'>Selected Card: {formData.selectedCard.name}</p>
        </div>
      )}
    </div>
  );
}