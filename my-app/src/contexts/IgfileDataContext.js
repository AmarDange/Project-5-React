import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { followHelper, unfollowHelper } from "../utils/utils";

import { useCurrentUser } from "./CurrentUserContext";

const IgfileDataContext = createContext();
const SetIgfileDataContext = createContext();

export const useIgfileData = () => useContext(IgfileDataContext);

export const useSetIgfileData = () => useContext(SetIgfileDataContext);

export const IgfileDataProvider = ({ children }) => {
  const [igfileData, setIgfileData] = useState({
    pageIgfile: { results: [] },
    popularIgfiles: { results: [] },
  });
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const handleFollow = async (clickedIgfile) => {
    try {
      const { data } = await axiosRes.post("/follower/", {
        followed_user: clickedIgfile.id,
      });

      setIgfileData((prevState) => ({
        ...prevState,
        pageIgfile: {
          results: prevState.pageIgfile.results.map((igfile) =>
            followHelper(igfile, clickedIgfile, data.id)
          ),
        },
        popularIgfiles: {
          ...prevState.popularIgfiles,
          results: prevState.popularIgfiles.results.map((igfile) =>
            followHelper(igfile, clickedIgfile, data.id)
          ),
        },
      }));
    } catch (err) {
      // console.log(err);
      if (err.response?.status === 500) {
        navigate("/500");
      }
    }
  };

  const handleUnfollow = async (clickedIgfile) => {
    try {
      await axiosRes.delete(`/follower/${clickedIgfile.following_id}`);
      setIgfileData((prevState) => ({
        ...prevState,
        pageIgfile: {
          results: prevState.pageIgfile.results.map((igfile) =>
            unfollowHelper(igfile, clickedIgfile)
          ),
        },
        popularIgfile: {
          ...prevState.popularIgfiles,
          results: prevState.popularIgfiles.results.map((igfile) =>
            unfollowHelper(igfile, clickedIgfile)
          ),
        },
      }));
      navigate(0);
    } catch (err) {
      // console.log(err);
      if (err.response?.status === 500) {
        navigate("/500");
      }
    }
  };

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/Igfile/?ordering=-follower_count"
        );

        setIgfileData((prevState) => ({
          ...prevState,
          popularIgfiles: data,
        }));
      } catch (err) {
        // console.log(err)
        if (err.response?.status === 500) {
          navigate("/500");
        }
      }
    };

    handleMount();
  }, [currentUser, navigate]);

  return (
    <IgfileDataContext.Provider value={igfileData}>
      <SetIgfileDataContext.Provider
        value={{ handleFollow, handleUnfollow, setIgfileData }}
      >
        {children}
      </SetIgfileDataContext.Provider>
    </IgfileDataContext.Provider>
  );
};