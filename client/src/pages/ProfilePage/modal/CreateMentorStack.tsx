import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import TechStackInput from '@pages/GroupCreatePage/TechStackInput';
import { TechStack } from '@types';
import { techStackHttpClient } from '@api';
import CustomButton from '@pages/GroupCreatePage/CustomButton';

interface Props {
  onCancel: () => void;
}
function CreateMentorStack({ onCancel }: Props): JSX.Element {
  const [baseTechStacks, setBaseTechStacks] = useState<TechStack[]>([]);
  const [usingStacks, setUsingStacks] = useState<string[]>([]);
  const [notificationText, setNotificationText] = useState<string>('');

  const checkMentorStack = () => usingStacks.length > 0;

  const requestCreateMentor = () =>{
    if(!checkMentorStack()){
      setNotificationText('최소 1개 이상 기술스택을 선택해주세요!');
      return;
    }
    setNotificationText('');
    //TODO: POST
  }

  useEffect(() => {
    const fetechTechStackList = async () => {
      const response: TechStack[] = await techStackHttpClient.getTechStackList();
      setBaseTechStacks(response);
    };

    fetechTechStackList();
  }, []);

  return (
    <Container>
      <ModalTitle>멘토링을 원하는 기술스택을 선택해주세요!</ModalTitle>
      <TechStackInput
        baseTechStackList={baseTechStacks}
        usingTechStacks={usingStacks}
        setUsingTechStacks={setUsingStacks}
      />
      <ButtonWrapper>
        <CustomButton label={'취소'} clickBtn={onCancel} />
        <CustomButton label={'확인'} clickBtn={requestCreateMentor} />
      </ButtonWrapper>
      <Notification>{notificationText}</Notification>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 600px;
  height: 350px;
`;
const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  width: 200px;
`;
const ModalTitle = styled.p`
  margin-left: 10px;
  margin-bottom: 20px;
  font-weight: bold;
`;

const Notification = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 13px;
  line-height: 40px;
  margin-left: 20px;
  color: #e50707;
`;
export default CreateMentorStack;
