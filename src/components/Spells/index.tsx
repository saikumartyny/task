import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AiOutlineStar, AiFillStar } from "react-icons/ai";

import { GettingDataType, ResultsType } from "./types";

import Popup from "reactjs-popup";

import "./styles.css";

const Spells = () => {
  const [apiData, setApiData] = useState<GettingDataType>({
    count: 0,
    results: [
      {
        index: "",
        name: "",
        url: "",
        isFavourite: false,
      },
    ],
  });
  const [popup, setPopup] = useState(false);
  const [favourites, setFavourites] = useState<ResultsType[] | undefined>([
    {
      index: "",
      name: "",
      url: "",
      isFavourite: false,
    },
  ]);
  console.log(favourites?.length);

  const navigate = useNavigate();

  useEffect(() => {
    const gettingDataCall = async () => {
      const url = "https://www.dnd5eapi.co/api/spells";
      const response = await fetch(url, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        const updatedData: GettingDataType = {
          count: data.count,
          results: data.results.map((each: ResultsType) => ({
            index: each.index,
            name: each.name,
            url: each.url,
            isFavourite: false,
          })),
        };
        setApiData(updatedData);
      }
    };

    gettingDataCall();
  }, []);

  const closeModal = () => setPopup(false);

  const Favourites = () => {
    return (
      <div data-testid="fav-container" className="main-container">
        <h1 data-testid="title" className="">
          Favourites
        </h1>

        <button
          className="text-style"
          type="button"
          onClick={() => setPopup(false)}
        >
          ◄ Back to Home
        </button>

        {favourites?.length === 0 ? (
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
            <tbody data-testid="fav-items">
              {favourites?.map((eachItem: ResultsType, index: number) => (
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

  const onClickFavourite = (id: string | undefined) => {
    const updatedData = {
      count: apiData?.count,
      results: apiData?.results?.map((eachItem: ResultsType) => {
        if (eachItem.index === id) {
          return { ...eachItem, isFavourite: !eachItem.isFavourite };
        }
        return eachItem;
      }),
    };
    setApiData(updatedData);
  };

  useEffect(() => {
    const filteredData = apiData?.results?.filter(
      (each: ResultsType) => each.isFavourite === true
    );
    setFavourites(filteredData);
  }, [apiData]);

  return (
    <>
      <div className="main-container">
        <h1 data-testid="header" className="header">
          Spells List
        </h1>
        <div className="btn-box">
          <button
            data-testid="fav-buttton"
            className="text-style"
            type="button"
            onClick={() => setPopup(!popup)}
          >
            Favourites List ►
          </button>
          <Popup onClose={closeModal} open={popup} position="bottom right">
            <Favourites />
          </Popup>
        </div>

        <table>
          <thead data-testid="table-header">
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>URL</th>
              <th>Favourite</th>
            </tr>
          </thead>
          <tbody>
            {apiData?.results?.map((eachItem, index) => (
              <tr data-testid={`spell-item-${index}`} key={index}>
                <td onClick={() => navigate(`/${eachItem.index}`)}>
                  {eachItem.index}
                </td>
                <td onClick={() => navigate(`/${eachItem.index}`)}>
                  {eachItem.name}
                </td>
                <td onClick={() => navigate(`/${eachItem.index}`)}>
                  {eachItem.url}
                </td>
                <td
                  onClick={() => onClickFavourite(eachItem.index)}
                  style={{ textAlign: "center" }}
                  data-testid={`fav-btn-${index}`}
                >
                  {eachItem.isFavourite ? (
                    <AiFillStar size={20} color="#333" />
                  ) : (
                    <AiOutlineStar size={20} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )
    </>
  );
};

export default Spells;
