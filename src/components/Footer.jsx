/**
 * @author Cristian Moreno <khriztianmoreno@gmail.com>
 */

import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const Footer = () => (
  <div>
    <Link to="/" data-cy="link-all">
      <FormattedMessage id="todos.all" />
    </Link>
    <Link to="/active" data-cy="link-active">
      <FormattedMessage id="todos.pending" />
    </Link>
    <Link to="/completed" data-cy="link-completed">
      <FormattedMessage id="todos.completed" values={{ author: '🧑🏼‍💻👨🏼‍💻👩🏻‍💻' }} />
    </Link>
  </div>
);

export default Footer;
