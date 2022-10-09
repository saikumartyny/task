import { useEffect, useState } from "react";

import { GettingDataType } from "../Spells/types";

import { Oval } from "react-loader-spinner";

import "./styles.css";

const SpellsDetails = () => {
  const [data, setData] = useState<GettingDataType>();
  const [spinner, setSpinner] = useState<Boolean>(false);

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
          color="gray"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="lightgray"
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
        <div data-testid="table-div" className="main-container">
          <h1 className="header">Spell Details</h1>
          <div className="spell-detail">
            <div className="left">
              <span>Index</span>
              <span>Name</span>
              <span>URL</span>
            </div>
            <div data-testid="header" className="right">
              <span>{data?.results?.[0].index}</span>
              <span>{data?.results?.[0].name}</span>
              <span>{data?.results?.[0].url}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SpellsDetails;
