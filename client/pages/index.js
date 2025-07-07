// pages/index.js
const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You Are Logged In!</h1>
  ) : (
    <h1>You Are Not Logged In!</h1>
  );
};

export default LandingPage;
