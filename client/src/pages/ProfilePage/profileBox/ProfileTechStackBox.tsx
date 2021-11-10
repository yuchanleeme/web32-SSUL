import React, { useState } from 'react';
import styled from '@emotion/styled';
import ProfileContainer from './ProfileBoxContainer';
import { BoxModal } from '@components';
import EditTechStack from './EditTechStack';

function ProfileTechStackBox(): JSX.Element {
  const techStackList = ['c++', 'java', 'javascript'];
  const [isModal, setIsModal] = useState<boolean>(false);

  const handleModalBackgroundClick = () => setIsModal(false);

  const handleEditButtonClick = () => setIsModal(true);
  return (
    <>
      <ProfileContainer title="기술스택">
        <EditButton onClick={handleEditButtonClick}>편집</EditButton>
        <TechStackContainer>
          {techStackList.map((techStackName, idx) => (
            <TechStackItem key={idx}>{techStackName}</TechStackItem>
          ))}
        </TechStackContainer>
      </ProfileContainer>

      {isModal && (
        <BoxModal
          style={{
            width: '600px',
            height: '400px',
            padding: '24px 0px 24px 0px',
          }}
          element={<EditTechStack />}
          onCancel={handleModalBackgroundClick}
        />
      )}
    </>
  );
}

const TechStackContainer = styled.div`
  display: flex;
  margin: 10px;
`;

const TechStackItem = styled.div`
  display: flex;
  margin: 10px;
  padding: 10px;
  background-color: ${(props) => props.theme.Primary};
  color: ${(props) => props.theme.White};
  border-radius: 10px;
  border: none;
`;

const EditButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  margin: 20px 20px 0 0;
  width: 50px;
  height: 30px;
  border: none;
  border-radius: 10px;
  background-color: ${(props) => props.theme.Primary};
  color: ${(props) => props.theme.White};
`;

export default ProfileTechStackBox;
