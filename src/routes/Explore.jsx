// IMPORTS
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaChevronRight } from 'react-icons/fa';

// Container to wrap the cards
const ExploreContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
  background-color: #f5f7fa;
  min-height: 100vh;
`;

// Card component to act as a clickable card
const Card = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

// Text styling inside the card
const CardTitle = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: #333;
`;

export default function Explore() {
  return (
    <ExploreContainer>
      <Link to="/search/<5km>">
        <Card>
          <CardTitle>5km</CardTitle>
          <FaChevronRight size={24} color="#333" />
        </Card>
      </Link>
      <Link to="/search/5-10km">
        <Card>
          <CardTitle>5-10km</CardTitle>
          <FaChevronRight size={24} color="#333" />
        </Card>
      </Link>
      <Link to="/search/>10km">
        <Card>
          <CardTitle>+10km</CardTitle>
          <FaChevronRight size={24} color="#333" />
        </Card>
      </Link>
    </ExploreContainer>
  );
}
