import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { get_a_user } from "../../store/session";
import { ContentList } from "../ContentList";
import { add_Followers, remove_Follower, load_Followers } from "../../store/follows";
import Dropdown from "rc-dropdown";
import Menu, { Item as MenuItem, Divider } from "rc-menu";
import "rc-dropdown/assets/index.css";
import "./menu.css";
import { FaEllipsisH} from "react-icons/fa";

export const ProfilePage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.profile);
    const loggedUser = useSelector((state) => state.session.user);
    const followers = useSelector((state) => state.followsReducer)

    const [test, setTest] = useState(false)

    let foll = followers?.follows?.filter(user => {
        console.log(user.id, +userId)
        return user.id === +userId
    })
    console.log(foll)

  const menu = (
    <Menu id='user-menu-style'>
      <MenuItem id="testing_menu" onClick={() => dispatch(add_Followers(loggedUser.id, userId))} key="1">Follow User</MenuItem>
      <MenuItem id="testing_menu" onClick={() => dispatch(remove_Follower(loggedUser.id, userId))} key="2">Unfollow</MenuItem>
    </Menu>
  );

  useEffect(() => {
      dispatch(load_Followers(loggedUser.id))
      dispatch(get_a_user(userId));
  }, [dispatch, userId]);



  const playlists = user?.playlists?.dict;

  return (
    <>
      <div className="albumTop user prof">
        <div>
          <img
            className="albumImage artistImage"
            src={
              user?.profile_image
                ? user?.profile_image
                : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ficon-library.com%2Fimages%2Fdefault-profile-icon%2Fdefault-profile-icon-16.jpg&f=1&nofb=1"
            }
          />
        </div>
        <div>
          <h3>PROFILE</h3>
          <h1>
            {user?.first_name
              ? user?.first_name + user?.last_name
              : user?.email}
          </h1>
          {/* <img className="artistIcon" src={artistObj?.image} /> */}
          {/* <Link to={`/albums/${artistObj?.id}`}>
                        {artistObj?.album?.artist}
                    </Link> */}
        </div>
      </div>
      <div id='following-menu'>
        <h4 id='following-title'>{followers?.follows && (followers?.follows?.filter(user => {
        return user.id === +userId
    }).length > 0) ? 'Following' : 'Follow'}</h4>
        <div style={{ margin: 20 }}>
          {/* <div style={{ height: 100 }} /> */}
          <div id='menu-marg'>
            <Dropdown
              trigger={["click"]}
              overlay={menu}
              animation="slide-up"


              // onVisibleChange={onVisibleChange}
            >
              <p id='icon-color' style={{width: 150}}><FaEllipsisH /></p>
            </Dropdown>
          </div>
        </div>
      </div>
      {playlists && <ContentList array={playlists} heading={"Playlists"} />}
    </>
  );
};
