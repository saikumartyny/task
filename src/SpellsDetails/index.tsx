import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { GettingDataType } from "../Spells/types";

import { Oval } from "react-loader-spinner";

const SpellsDetails = () => {
  const [data, setData] = useState<GettingDataType>();
  const [spinner, setSpinner] = useState<Boolean>(false);

  const location = useLocation();

  useEffect(() => {
    const path = window.location.pathname.split("/")[1].split("-");

    const gettingDataCall = async () => {
      let url = null;
      if (path[1] === undefined) {
        url = `https://www.dnd5eapi.co/api/spells/?name=${path[0]}`;
      } else {
        url = `https://www.dnd5eapi.co/api/spells/?name=${path[0]}+${path[1]}`;
      }

      const response = await fetch(url, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setData(data);
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
          color="#494d4b"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#6f7371"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  };

  return (
    <>
      {spinner ? (
        spinnerRender()
      ) : (
        <div className="main-container">
          <table>
            <thead>
              <tr>
                <th>index</th>
                <th>name</th>
                <th>url</th>
              </tr>
            </thead>
            <tbody>
              {data?.results?.map((eachItem) => (
                <tr>
                  <td>{eachItem.index}</td>
                  <td>{eachItem.name}</td>
                  <td>{eachItem.url}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default SpellsDetails;
