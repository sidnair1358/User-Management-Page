import { QueryClient, QueryClientProvider } from "react-query";
import { Users } from "./components/Users";
import "./input.css";
import "./index.css";
import { AppContextProvider } from "./utils/AppContextProvider";
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <Users />
      </AppContextProvider>
    </QueryClientProvider>
  );
}
