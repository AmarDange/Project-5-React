// Popular igfiles functionality credit goes to CI's Moments Project
import React from "react";
import Card from "react-bootstrap/Card";
import shadowStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useIgfileData } from "../../contexts/IgfileDataContext";
import Igfile from "./Igfile";
import igfileStyles from "../../styles/IgfilePagePopular.module.css";

const PopularIgfiles = ({ mobile }) => {
  const { popularIgfiles } = useIgfileData();

  return (
    <Card
      className={`bg-white ${shadowStyles.Shadow} ${igfileStyles.IgfileFont}
        ${mobile && "d-lg-none text-center mb-3"}`}
    >
      {popularIgfiles.results.length ? (
        <>
          <Card.Header>
            <p className="text-center font-weight-bold mb-0">
              Popular Igfiles
            </p>
          </Card.Header>
          {mobile ? (
            <Card.Body className="d-flex justify-content-around small">
              {popularIgfiles.results.slice(0, 4).map((igfile) => (
                <Igfile key={igfile.id} igfile={igfile} mobile />
              ))}
            </Card.Body>
          ) : (
            <Card.Body className="pt-2 pb-2">
              {popularIgfiles.results.map((igfile) => (
                <Igfile key={igfile.id} igfile={igfile} />
              ))}
            </Card.Body>
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Card>
  );
};

export default PopularIgfiles;
