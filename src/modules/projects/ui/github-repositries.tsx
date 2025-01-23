'use client'
import { getUserRepositories } from '@/shared/services/githubService';
import { useState, useEffect } from 'react';

const UserRepositories = ({ username }: { username: string }) => {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserRepositories(username);
        setRepositories(data);
      } catch (error) {
        console.error('Error fetching user repositories:', error);
      }
    };

    fetchData();
  }, [username]);

  if (repositories.length === 0) return <div>Loading...</div>;

  return (
    <ul>
      {repositories.map((repo) => (
        <li key={repo.id}>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            {repo.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default UserRepositories;
