import { NavLink } from "react-router-dom";
import { useGetUsers } from "../lib/Rquery/RTQApi";
import Loading from "./Loading";

function TopCreators() {
  const { data: users, isLoading: isUsersLoading } = useGetUsers();

  return (
    <div className="top-creators p-8 hidden lg:flex flex-col text-white gap-5 overflow-scroll max-h-screen bg-bg min-w-fit">
      <div className=" text-2xl font-bold flex flex-col ">Top Creators</div>
    {isUsersLoading ? (
      <Loading />
    ) : (
      users.documents.map((user) => (
        <NavLink to={`/profile/` + user.$id}
          key={user.$id}
          className="profile flex flex-col justify-start items-center gap-3 py-8 px-14 rounded-3xl border border-cOne"
        >
          <img
            src={user.imageUrl}
            alt="profileImage"
            className="w-14 rounded-full"
          />
          <div className="info">
            <div className="name font-semibold">{user.name}</div>
            <div className="username text-sm text-cOne">
              {"@" + user.username}
            </div>
          </div>
        </NavLink>
      )))}
    </div>
  );
}

export default TopCreators;
