import React, { useState, useRef, useEffect } from 'react';
import SearchView from '../views/SearchView';

const sampleItems = [
  { name: 'Liam', distance: '5 km', location: 'New York', date: '2023-08-20', pace: '5:00 min/km', description: 'A great run!', image: 'https://t4.ftcdn.net/jpg/06/08/55/73/360_F_608557356_ELcD2pwQO9pduTRL30umabzgJoQn5fnd.jpg', userId: 1, time: '14:30' },
  { name: 'Emma', distance: '10 km', location: 'Los Angeles', date: '2023-08-21', pace: '4:30 min/km', description: 'Feeling good!', image: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg', userId: 2, time: '13:45' },
  { name: 'Noah', distance: '15 km', location: 'Chicago', date: '2023-08-22', pace: '4:45 min/km', description: 'Challenging run!', image: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg', userId: 3, time: '12:30' },
  { name: 'Olivia', distance: '20 km', location: 'Houston', date: '2023-08-23', pace: '5:15 min/km', description: 'Great weather!', image: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg', userId: 4, time: '15:00' },
  { name: 'Liam', distance: '5 km', location: 'New York', date: '2023-08-20', pace: '5:00 min/km', description: 'A great run!', image: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg', userId: 1, time: '14:30' },
  { name: 'Emma', distance: '10 km', location: 'Los Angeles', date: '2023-08-21', pace: '4:30 min/km', description: 'Feeling good!', image: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg', userId: 2, time: '13:45' },
  { name: 'Noah', distance: '15 km', location: 'Chicago', date: '2023-08-22', pace: '4:45 min/km', description: 'Challenging run!', image: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg', userId: 3, time: '12:30' },
  { name: 'Olivia', distance: '20 km', location: 'Houston', date: '2023-08-23', pace: '5:15 min/km', description: 'Great weather!', image: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg', userId: 4, time: '15:00' },
 
];

const Search = () => {
  const [searchedItems, setSearchedItems] = useState(sampleItems);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [sortedItems, setSortedItems] = useState(sampleItems);
  const containerRef = useRef(null);

  const handleSearch = (newSearchResults) => {
    setSearchedItems(newSearchResults);
    setSelectedFilters({});           // Reset filters
    setSortedItems(newSearchResults); // Reset sorting base to the new search results
  };

  useEffect(() => {
    const sortedByTime = [...searchedItems].sort((a, b) =>
      a.time.localeCompare(b.time)
    );
    setSortedItems(sortedByTime);
  }, [searchedItems]);

  return (
    <SearchView
      items={sampleItems}
      searchedItems={searchedItems}
      sortedItems={sortedItems}
      selectedFilters={selectedFilters}
      handleSearch={handleSearch}
      setSelectedFilters={setSelectedFilters}
      setSortedItems={setSortedItems}
      containerRef={containerRef}
    />
  );
};

export default Search;
