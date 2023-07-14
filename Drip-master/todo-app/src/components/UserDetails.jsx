const UserDetails = ({ user }) => {
  return (
    <div className=" flex flex-col  mt-16 ml-8">
      <div>Name: {user.name}</div>
      <div>Email: {user.email}</div>
    </div>
  );
};

export default UserDetails;
