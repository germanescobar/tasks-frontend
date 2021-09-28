/**
 * @author Cristian Moreno <khriztianmoreno@gmail.com>
 */

import { Link } from 'react-router-dom';

const Footer = () => (
  <div>
    <Link to="/" data-cy="link-all">
      All
    </Link>
    <Link to="/active" data-cy="link-active">
      Pending
    </Link>
    <Link to="/completed" data-cy="link-completed">
      Completed
    </Link>
  </div>
);

export default Footer;
