import {useEffect, useState, ChangeEvent} from 'react';
import Collection from '../collection/Collection';
import {Collections} from '../../types/collections';
import {categories} from '../../const';

function App() {
  const [collections, setCollections] = useState<Collections>([]);
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [activeCategoryId, setActiveCategoryId] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setLoading(true);

    fetch(`https://6353e24dccce2f8c02fe8dcd.mockapi.io/phot-collections?page=${currentPage}&limit=3&${activeCategoryId ? `category=${activeCategoryId}` : ''}`)
      .then((response) => response.json())
      .then((collections) => setCollections(collections))
      .catch((error) => console.warn(error))
      .finally(() => setLoading(false));
  }, [activeCategoryId, currentPage]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>

      <div className="top">
        <ul className="tags">
          {
            categories.map((category, index) => (
              <li
                className={activeCategoryId === index ? 'active' : ''}
                onClick={() => setActiveCategoryId(index)}
                key={category+index}
              >
                {category}
              </li>
            ))
          }
        </ul>

        <input
          value={searchInputValue}
          onChange={(evt: ChangeEvent<HTMLInputElement>) => setSearchInputValue(evt.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>

      <div className="content">
        {
          isLoading
          ? <h2>Идет загрузка...</h2>

          : collections
              .filter((collection) => {
                return collection.name.toLowerCase().includes(searchInputValue.toLowerCase());
              })
              .map((collection, index) => (
                <Collection
                  name={collection.name}
                  images={collection.photos}
                  key={collection.name+index}
                />
              ))
        }
      </div>

      <ul className="pagination">
        {
          [...Array(3)].map((obj, index) => (
            <li
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
              key={index}
            >
              {index + 1}
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default App;
