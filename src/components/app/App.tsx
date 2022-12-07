import {useEffect, useState, ChangeEvent} from 'react';
import Collection from '../collection/Collection';
import {Collections} from '../../types/collections';
import {categories} from '../../const';

function App() {
  const [collections, setCollections] = useState<Collections>([]);
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [activeCategoryId, setActiveCategoryId] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    setLoading(true);

    fetch(`https://6353e24dccce2f8c02fe8dcd.mockapi.io/phot-collections?${activeCategoryId ? `category=${activeCategoryId}` : ''}`)
      .then((response) => response.json())
      .then((collections) => setCollections(collections))
      .catch((error) => console.warn(error))
      .finally(() => setLoading(false));
  }, [activeCategoryId]);

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
                key={index}
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
                  key={index}
                />
              ))
        }
      </div>

      <ul className="pagination">
        <li>1</li>
        <li className="active">2</li>
        <li>3</li>
      </ul>
    </div>
  );
};

export default App;
