
import Dashboard from './Dashboard';
import NavBar from './NavBar';
import NotConnected from './NotConnected';


const Main = ({ isUserConnected }) => {
    if (!isUserConnected) {
        return <NotConnected />;
      } else {
        return (
          <>
            <NavBar />
            <Dashboard />
          </>
        );
      }
    };
export default Main