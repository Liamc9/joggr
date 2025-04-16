import React, {useState} from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaRoad, FaClock } from 'react-icons/fa';
import { BottomSheet } from 'liamc9npm';
import BottomSheetContent from './BottomSheetContent';

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
  max-width: 500px;
  background-color: #fff;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const ProfilePic = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 16px;
`;

const CenterSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 18px;
  color: #555;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-s;
`;

const Distance = styled(InfoRow)`
  font-size: 20px;
  font-weight: bold;
  color: #000;
`;

const Time = styled(InfoRow)`
  font-size: 18px;
  color: #777;
`;

const ProfileCard = ({
  data,
  onCardClick 
}) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  
  const handleCardClick = (item) => {
    setIsBottomSheetOpen(true);
    console.log('Card clicked:', item);
  };

  console.log('ProfileCard data:', data);
  return (
    <>
    <Card onClick={() => handleCardClick(data)}>
      <LeftSection>
        <ProfilePic src={data.image} alt={data.name} />
        <CenterSection>
          <Name>{data.name}</Name>
          <InfoRow><FaMapMarkerAlt />{data.location}</InfoRow>
        </CenterSection>
      </LeftSection>
      <RightSection>
        <Distance><FaRoad />{data.distance}</Distance>
        <Time><FaClock />{data.time}</Time>
      </RightSection>
    </Card>
    
    <BottomSheet
    height="80vh"
    maxWidth="600px"
    onClose={() => setIsBottomSheetOpen(false)}
    transitionDuration={300}
    isOpen={isBottomSheetOpen}
  >
    <BottomSheetContent data={data} />
  </BottomSheet>
  </>
  );
};

export default ProfileCard;
