import { NavLink } from "react-router-dom";
import Loading from "../components/Loading";
import { useGetUsers } from "../lib/Rquery/RTQApi";

function People() {
  const { data: users, isLoading: isUsersLoading } = useGetUsers();

  return (
    <div className="flex-1 h-screen overflow-scroll">
      <div className=" text-2xl font-bold h-fit pt-12 px-8 text-white mt-12 md:mt-0">
        All Users
      </div>
      <div className="flex-1 h-screen text-white pt-12 px-8 gap-6 overflow-scroll">
        <div className="users flex items-center justify-center gap-5 flex-wrap">
          {isUsersLoading ? (
            <Loading />
          ) : (
            users.documents.map((user) => (
              <NavLink
                to={"../profile/" + user.$id}
                key={user.$id}
                className="profile w-56 flex flex-col justify-start items-center gap-3 py-8 px-14 rounded-3xl border border-cOne"
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default People;
