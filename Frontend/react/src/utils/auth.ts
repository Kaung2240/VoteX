// utils/auth.ts
export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error('Refresh failed');
      
      localStorage.setItem('access_token', data.access);
      return data.access;
    } catch (error) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.reload(); // Redirect to login
      throw error;
    }
  };

  // Logout Function
export const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    // Redirect to login page
    window.location.href = '/login';
  };