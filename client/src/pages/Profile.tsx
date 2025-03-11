import useUserStore from "../store/user-store"

const Profile = () => {
  const user = useUserStore(state => state.user)
  console.log(user)

  return (
    <>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Mobile no.: {user.mobile}</p>
    </>
  )
}

export default Profile
