import { useLocation, Link } from "react-router-dom";
import { ResultsType } from "../Spells/types";

const Favourites = () => {
  const location = useLocation();

  const filteredData = location.state?.results?.filter(
    (each: ResultsType) => each.isFavourite === true
  );

  return (
    <div className="main-container">
      <h1 className="">Favourites</h1>
      <Link className="link" to="/">
        <button className="text-style">◄ Back to Home</button>
      </Link>
      {filteredData === undefined ? (
        <>
          <h1>No favourites</h1>
        </>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((eachItem: ResultsType, index: number) => (
              <tr key={index}>
                <td>{eachItem.index}</td>
                <td>{eachItem.name}</td>
                <td>{eachItem.url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Favourites;
