import { useContext } from 'react';
import ExbContext from './ExbContext';

// Custom hook to use the ExbContext
const useExbContext = () => {
  const context = useContext(ExbContext);

  if (context === undefined) {
    throw new Error('useExbContext must be used within a ExbProvider');
  }

  return context;
};

export default useExbContext;
