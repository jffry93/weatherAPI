import { BsSearch } from 'react-icons/bs';
import styled from 'styled-components';
//REDUX
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectedCity } from '../features/location/location-slice';

const Navbar = () => {
  const place: string = useAppSelector((state) => state.location.city);
  const dispatch = useAppDispatch();

  const updateCity = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const [_, location] = formData.entries().next().value;
    dispatch(selectedCity(location));
  };
  return (
    <StyledNavbar>
      <form action='' onSubmit={updateCity}>
        <input name='location' type='text' placeholder='City or PostalCode' />{' '}
        <button type='submit'>
          <BsSearch />
        </button>
      </form>
    </StyledNavbar>
  );
};

const StyledNavbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 16px 22px 16px 32px;
  max-width: 500px;

  position: relative;
  form {
    display: flex;
    gap: 24px;

    width: 100%;
    max-width: 400px;
    margin: auto;
    z-index: 3;
    input {
      width: 100%;
      padding-left: 8px;
    }
    button {
      svg {
        height: 25px;
        width: 25px;
      }
    }
    button:hover {
      cursor: pointer;
      transform: scale(1.05);
      /* transform: scale(1.02); */
    }
    button:active {
      transform: scale(1);
    }
  }
`;

export default Navbar;
