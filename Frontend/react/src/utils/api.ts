// In src/utils/api.ts
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

const getToken = () => {
  // Implement your token retrieval logic here
  return 'your-token';
};

const api = {
  baseURL: `${BASE_URL}/api/`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },

  updateUserProfile: async (data: any) => {
    const response = await axios.patch(
      `${BASE_URL}/api/user/profile/`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response;
  },

  updateTimezone: async (timezone: string) => {
    const response = await axios.patch(
      `${BASE_URL}/api/user/profile/`,
      { timezone },
      {
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response;
  }
};

export default api;