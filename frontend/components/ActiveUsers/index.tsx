import Userlist from "./Userslist";

const ActiveUsers = ({ activesusers }) => {
  return (
    <>
      <Userlist activeusers={activesusers} />
    </>
  );
};

export default ActiveUsers;
