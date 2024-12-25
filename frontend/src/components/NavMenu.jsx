import { useNavigate } from 'react-router-dom';

function NavMenu() {
  const navigate = useNavigate();

  const navHome = () => {
    navigate('/home-alt');
  };
  const navDocs = () => {
    navigate('/docs');
  };
  const navContact = () => {
    navigate('/contact');
  };
  const navLogin = () => {
    navigate('/login');
  };
  const navDev = () => {
    navigate('/contribute');
  };  

  return (
  	<div className="nav-menu">
    	<ul>
      		<li><button onClick={navHome}>Home</button></li>
      		<li><button onClick={navContact}>Contact</button></li>
      		<li><button onClick={navDev}>Contribute</button></li>
      		<li><button onClick={navDocs}>Docs</button></li>
      		<li><button onClick={navLogin}>Login</button></li>
		</ul>
    </div>
  );
}

export default NavMenu;
