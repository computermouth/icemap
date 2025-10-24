import { useQuery } from '@tanstack/react-query';
import './App.css';

const App = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["apiRequest"],
    queryFn: async () => {
      const resp = await fetch("/api");
      return resp.text();
    }
  });

  if (isLoading) {
    return <p className="content">Loading...</p>
  }

  if (error) {
    
    return <p className="content">Error Occured</p>
  }

  return (
    <div className="content">
      <h1>{data}</h1>
    </div>
  );
};

export default App;
