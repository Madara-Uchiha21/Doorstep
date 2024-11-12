import { fetchProfile } from '../api/userService';

const MyComponent = () => {
  const loadProfile = async () => {
    try {
      const profileData = await fetchProfile();
      console.log('Profile Data:', profileData);
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  // Call loadProfile in useEffect or wherever necessary
};
