import React, { useState } from 'react';
import styled from 'styled-components';
import {
  FeedItem,
  FeedLogic,
  PaginationControls,
  LoadMoreButton,
} from 'liamc9npm';

// Styled component for the feed container
const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// Component
const Feed = ({
  items = [],
  sortBy,
  selectedFilters = {},
  ItemComponent = FeedItem,
  pagination,
  loadMore,
  infiniteScroll,
  scrollContainerRef,
}) => {
  const {
    itemsToRender,
    pages,
    currentPage,
    setCurrentPage,
    hasMoreItems,
    handleLoadMore,
  } = FeedLogic({
    items,
    sortBy,
    selectedFilters,
    pagination,
    loadMore,
    infiniteScroll,
    scrollContainerRef,
  });


  return (
    <>
      <FeedContainer>
        {itemsToRender.map((item, index) => (
          <ItemComponent key={index} data={item}  />
        ))}

        {pages?.length > 1 && (
          <PaginationControls
            pages={pages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        {loadMore && (
          <LoadMoreButton
            hasMoreItems={hasMoreItems}
            onLoadMore={handleLoadMore}
          />
        )}
      </FeedContainer>

    </>
  );
};

export default Feed;
