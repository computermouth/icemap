import { useQuery } from '@tanstack/react-query';
import { NavigationBar } from './components/NavigationBar';
import { MainSection } from './components/MainSection';

const App = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["apiRequest"],
    queryFn: async () => {
      const resp = await fetch("/api");
      return resp.text();
    }
  });

  if (isLoading) {
    return <p className="">Loading...</p>
  }

  if (error) {

    return <p className="">Error Occured</p>
  }

  return (
    <>
      <div className="bg-black-80 white vh-100">
        <NavigationBar />
        <MainSection />
      </div>
    </>
  );
};

export default App;
