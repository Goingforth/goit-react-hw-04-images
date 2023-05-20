import PropTypes from 'prop-types';
import { LocationButton, LoadMore } from './Button.styled';

const Button = ({ onClick }) => {
  return (
    <LocationButton>
      <LoadMore type="button" onClick={onClick}>
        Load more
      </LoadMore>
    </LocationButton>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
