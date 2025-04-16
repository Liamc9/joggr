import React, { useState } from 'react';
import styled from 'styled-components';
import RunCard from '../components/RunCard';
import Feed from '../components/search/Feed';
import FilterDrawer from '../components/search/FilterDrawer';
import { BottomSheet } from 'liamc9npm';
import { FaMapMarkerAlt } from 'react-icons/fa';

// Styled Components
const SearchViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  max-height: 90vh;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  margin-bottom: 20px;
  font-weight: bold;
  padding: 10px 0;
  background-color: #f8f8f8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MapButton = styled.button`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);  
  color: #777;
  gap: 10px;
`;

const ScrollableFeedContainer = styled.div`
  width: 100%;
  padding: 10px;
`;

const SearchView = ({
  items,
  searchedItems,
  sortedItems,
  selectedFilters,
  handleSearch,
  setSelectedFilters,
  setSortedItems,
  containerRef,
}) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  return (
    <>
      <SearchViewContainer ref={containerRef}>
        <Header>5-10km</Header>

        <ButtonContainer>
          <FilterContainer>
            <FilterDrawer onChange={setSelectedFilters} />
          </FilterContainer>

          <SortContainer>
            <MapButton onClick={() => setIsBottomSheetOpen(true)}>
              <FaMapMarkerAlt />
              Map
            </MapButton>
          </SortContainer>
        </ButtonContainer>

        <ScrollableFeedContainer>
          <Feed
            items={sortedItems}
            selectedFilters={selectedFilters}
            infiniteScroll={5} // loads 5 items at a time
            ItemComponent={RunCard}
            scrollContainerRef={containerRef}
          />
        </ScrollableFeedContainer>
      </SearchViewContainer>

      <BottomSheet
        height="80vh"
        maxWidth="600px"
        onClose={() => setIsBottomSheetOpen(false)}
        transitionDuration={300}
        isOpen={isBottomSheetOpen}
      >
        <div style={{ padding: '20px' }}>
          {/* TODO: Replace placeholder with actual map or content */}
          <p>Map view or additional content goes here.</p>
        </div>
      </BottomSheet>
    </>
  );
};

export default SearchView;
