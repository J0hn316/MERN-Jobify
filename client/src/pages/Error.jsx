import { Link, useRouteError } from 'react-router-dom';
import Wrapper from '../assets/wrappers/ErrorPage';
import img from '../assets/images/not-found.svg';

const Error = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="Not Found" />
          <h3>Oops! Page Not Found</h3>
          <p>The page you are looking for could not be found.</p>
          <Link to="/dashboard">Go To Home</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <div>
      <h3>Something went wrong</h3>
      <Link to="/">Back to home</Link>
    </div>
  );
};
export default Error;
