import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Oval } from "react-loader-spinner";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

import { GettingDataType, ResultsType } from "./types";

import Table from "react-bootstrap/Table";

import "./styles.css";

const Spells = () => {
  const [apiData, setApiData] = useState<GettingDataType>();
  const [spinner, setSpinner] = useState<Boolean>(false);
  const [favourites, setFavourites] = useState<GettingDataType>();

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
        setSpinner(false);
      }
    };

    gettingDataCall();
    setSpinner(true);
  }, []);

  const spinnerRender = () => {
    return (
      <div className="loader-container">
        <Oval
          height={80}
          width={80}
          color="#ff9999"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#ffb3b3"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
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
    setFavourites(updatedData);
  };

  return (
    <>
      {spinner ? (
        spinnerRender()
      ) : (
        <div className="main-container">
          <Link className="link" to="/favourites" state={favourites}>
            <h1 className="text-style">Go to Favourites</h1>
          </Link>

          <Table responsive>
            <thead>
              <tr>
                <th>Index</th>
                <th>Name</th>
                <th>URL</th>
                <th>Favourite</th>
              </tr>
            </thead>
            <tbody>
              {apiData?.results?.map((eachItem, index) => (
                <tr key={index}>
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
                  >
                    {eachItem.isFavourite ? (
                      <AiFillStar size={20} />
                    ) : (
                      <AiOutlineStar size={20} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default Spells;
