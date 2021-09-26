/**
 * @author Cristian Moreno <khriztianmoreno@gmail.com>
 */

import { useSelector } from 'react-redux';

const Message = () => {
  const message = useSelector((state) => state.message);
  return message ? <span className="message">{message}</span> : null;
};

export default Message;
