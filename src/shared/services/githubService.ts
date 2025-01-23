
const GITHUB_API_URL = 'https://api.github.com';
const TOKEN = 'YOUR_PERSONAL_ACCESS_TOKEN';

export const getUserData = async (username: string) => {
  try {
    const response = await fetch(`${GITHUB_API_URL}/users/${username}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${TOKEN}`,
			}
		});
		//@ts-expect-error - data is not a property of response
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const getUserRepositories = async (username: string) => {
  try {
    const response = await fetch(`${GITHUB_API_URL}/users/${username}/repos`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${TOKEN}`,
			}
		});
		//@ts-expect-error - data is not a property of response
    return response.data;
  } catch (error) {
    console.error('Error fetching user repositories:', error);
    throw error;
  }
};