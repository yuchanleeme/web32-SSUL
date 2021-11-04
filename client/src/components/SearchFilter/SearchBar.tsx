import React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '../../store/rootReducer';
import {
  changeTechStackInput,
  groupRecruitType,
  returnGroupTechStack,
} from '../../store/slices/groupTechStackList';

function SearchBar(): JSX.Element {
  const groupTechStackList = useSelector<ReducerType, groupRecruitType>(returnGroupTechStack);
  const dispatch = useDispatch();

  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTechStackInput(e.currentTarget.value));
  };

  return (
    <Container>
      <InputValue
        placeholder="Search for.."
        value={groupTechStackList.techStackInput}
        onChange={handleInputText}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin: 10px;
  padding: 10px;

  background: ${(props) => props.theme.White};
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px 30px 30px 30px;
`;

const InputValue = styled.input`
  display: flex;
  border: none;
`;

export default SearchBar;
