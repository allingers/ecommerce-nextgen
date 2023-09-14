import { Link } from 'react-router-dom';

interface LoginMessageProps {}


const LoginMessage: React.FC<LoginMessageProps> = () => {

  return (
    <div className="login-message">
      <p>
        Du måste vara inloggad för att lägga en order -  <Link to="/login"> Logga in</Link>
      </p> 

    </div>
  );
};

export default LoginMessage;
