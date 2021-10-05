/**
 * @author Cristian Moreno <khriztianmoreno@gmail.com>
 */

import { Link } from 'react-router-dom';

const Footer = () => (
  <div>
    <Link to="/" data-cy="link-all">
      all
    </Link>
    <Link to="/active" data-cy="link-active">
      pending
    </Link>
    <Link to="/completed" data-cy="link-completed">
      completed
    </Link>
  </div>
);

export default Footer;
