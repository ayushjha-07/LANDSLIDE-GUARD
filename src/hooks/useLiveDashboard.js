import { useSensorContext } from '../context/SensorContext';

export const useLiveDashboard = () => {
  return useSensorContext();
};

export default useLiveDashboard;
