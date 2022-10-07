import { useLocation } from "react-router-dom";
import { ResultsType } from "../Spells/types";

const Favourites = () => {
  const location = useLocation();

  return (
    <div className="main-container">
      <h1 className="text-style fa">Favourites</h1>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {location.state?.results?.map(
            (eachItem: ResultsType, index: number) => {
              if (eachItem.isFavourite) {
                return (
                  <tr key={index}>
                    <td>{eachItem.index}</td>
                    <td>{eachItem.name}</td>
                    <td>{eachItem.url}</td>
                  </tr>
                );
              }
            }
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Favourites;
