import React from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaClock, FaRulerHorizontal, FaRunning } from 'react-icons/fa';

const Card = styled.div`
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  font-family: sans-serif;
  background-color: white;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border: 2px solid #777;
  border-radius: 50%;
`;

const Name = styled.h2`
  margin-left: 12px;
  font-size: 20px;
`;

const Info = styled.div`
  margin: 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Description = styled.p`
  margin: 12px 0;
  padding: 8px;
  min-height: 60px;
  border-top: 1px dashed #aaa;
  border-bottom: 1px dashed #aaa;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const RunCard = ({ data }) => {
  return (
    <Card>
      <Header>
        <Avatar src={data.image} alt={data.name} />
        <Name>{data.name}</Name>
      </Header>

      <Info><FaMapMarkerAlt /> {data.location}</Info>
      <Info><FaClock /> {data.date} at {data.time}</Info>
      <Info><FaRulerHorizontal /> {data.distance}</Info>
      <Info><FaRunning /> {data.pace}</Info>

      <Description>{data.description}</Description>

      <Button>Ask To Join!</Button>
    </Card>
  );
};

export default RunCard;
