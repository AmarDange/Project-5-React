// Igfile page functionality credit goes to CI's Moments Project
import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Container,
  Image,
  Button,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import Asset from "../../components/Asset";
import btnStyles from "../../styles/Button.module.css";
import shadowStyles from "../../App.module.css";
import PopularIgfiles from "./PopularIgfiles";
import Post from "../post/Post";
import { fetchMoreData } from "../../utils/utils";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useNavigate, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/no-results.png";
import styles from "../../styles/IgfilePagePopular.module.css";
import {
  useSetIgfileData,
  useIgfileData,
} from "../../contexts/IgfileDataContext";
import InfiniteScroll from "react-infinite-scroll-component";

function IgfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const navigate = useNavigate();
  const [igfilePosts, setIgfilePosts] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const { setIgfileData, handleFollow, handleUnfollow } = useSetIgfileData();
  const { pageIgfile } = useIgfileData();
  const [igfile] = pageIgfile.results;
  const is_author = currentUser?.username === igfile?.author;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageIgfile }, { data: igfilePosts }] =
          await Promise.all([
            axiosReq.get(`/igfile/${id}`),
            axiosReq.get(`/post/?author__igfile=${id}`),
          ]);
        setIgfileData((prevState) => ({
          ...prevState,
          pageIgfile: { results: [pageIgfile] },
        }));
        setIgfilePosts(igfilePosts);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err)
        if (err.response?.status === 500) {
          navigate("/500");
        }
      }
    };
    fetchData();
  }, [id, setIgfileData, navigate]);

  const mainIgfile = (
    <>
      <Row className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.IgfileImage}
            roundedCircle
            src={igfile?.image}
          />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{igfile?.author}</h3>
          <Row className="justify-content-around no-gutters">
            <Col xs={3} className="my-2">
              <div>{igfile?.post_count}</div>
              <div>posts</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{igfile?.follower_count}</div>
              <div>followers</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{igfile?.following_count}</div>
              <div>following</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
          {currentUser &&
            !is_author &&
            (igfile?.following_id ? (
              <Button
                aria-label="Click here to unfollow profile"
                className={btnStyles.Btn}
                onClick={() => handleUnfollow(igfile)}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                aria-label="Click here to follow profile"
                className={btnStyles.Btn}
                onClick={() => handleFollow(igfile)}
              >
                Follow
              </Button>
            ))}
          {igfile?.is_author && (
            <>
              <div>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Click to edit igfile</Tooltip>}
                >
                  <i
                    className={`fa-solid fa-file-pen ${styles.EditDeleteIcon}`}
                    onClick={() => {
                      navigate(`/igfile/${id}/edit`);
                    }}
                  ></i>
                </OverlayTrigger>
                <span className="text-dark ml-1 mr-1"> | </span>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Click to change username</Tooltip>}
                >
                  <i
                    className={`fa-solid fa-user-pen ${styles.EditDeleteIcon}`}
                    onClick={() => {
                      navigate(`/igfile/${id}/edit/username`);
                    }}
                  ></i>
                </OverlayTrigger>
                <span className="text-dark ml-1 mr-1"> | </span>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Click to change password</Tooltip>}
                >
                  <i
                    className={`fa-solid fa-lock ${styles.EditDeleteIcon}`}
                    onClick={() => {
                      navigate(`/igfile/${id}/edit/password`);
                    }}
                  ></i>
                </OverlayTrigger>
              </div>
            </>
          )}
        </Col>
        {igfile?.content && <Col className="p-3">{igfile.content}</Col>}
      </Row>
    </>
  );

  const mainIgfilePosts = (
    <>
      <hr />
      <p className="text-center">{igfile?.author}'s posts</p>
      {igfilePosts.results.length ? (
        <div className={styles.PageFont}>
          <InfiniteScroll
            dataLength={igfilePosts.results.length}
            loader={<Asset spinner />}
            hasMore={!!igfilePosts.next}
            next={() => fetchMoreData(igfilePosts, setIgfilePosts)}
          >
            {igfilePosts.results.map((post) => (
              <Post key={post.id} {...post} setPosts={setIgfilePosts} />
            ))}
          </InfiniteScroll>
        </div>
      ) : (
        <Container className={"text-center d-flex justify-content-center p-4"}>
          <Asset
            src={NoResults}
            height={100}
            width={100}
            message={`No results found, ${igfile?.author} hasn't posted yet.`}
          />
        </Container>
      )}
    </>
  );

  return (
    <Container>
      <PopularIgfiles mobile />
      <Row>
        <Col
          className={`bg-white py-2 p-0 p-lg-2 ${shadowStyles.Shadow}`}
          lg={8}
        >
          <Container>
            {hasLoaded ? (
              <>
                {mainIgfile}
                {mainIgfilePosts}
              </>
            ) : (
              <Asset spinner />
            )}
          </Container>
        </Col>
        <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
          <PopularIgfiles />
        </Col>
      </Row>
    </Container>
  );
}

export default IgfilePage;
