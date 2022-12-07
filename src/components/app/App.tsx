import {useEffect, useState, ChangeEvent} from 'react';
import Collection from '../collection/Collection';
import {Collections} from '../../types/collections';

function App() {
  const [collections, setCollections] = useState<Collections>([]);
  const [searchInputValue, setSearchInputValue] = useState<string>('');

  useEffect(() => {
    fetch('https://6353e24dccce2f8c02fe8dcd.mockapi.io/phot-collections')
      .then((response) => response.json())
      .then((collections) => setCollections(collections))
      .catch((error) => console.warn(error));
  }, [])

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>

      <div className="top">
        <ul className="tags">
          <li className="active">Все</li>
          <li>Горы</li>
          <li>Море</li>
          <li>Архитектура</li>
          <li>Города</li>
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
          collections
            .filter((collection) => {
              return collection.name.toLowerCase().includes(searchInputValue.toLowerCase());
            })
            .map((collection) => (
              <Collection
                name={collection.name}
                images={collection.photos}
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
