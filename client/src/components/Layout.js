// Define a layout component for easier style application and props management
import Header from "./Header";

const Layout = ({ children, userData, handleLogout }) => {
  // Render the component
  return (
    <div className="App">
      <Header userData={userData} handleLogout={handleLogout} />
      {children}
    </div>
  );
};

export default Layout;
