import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBjuirLMRLevVTfEnsvvFM90uRPFKQTvT0',
  authDomain: 'netflix-ui-6a10f.firebaseapp.com',
  projectId: 'netflix-ui-6a10f',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
