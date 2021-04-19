const OauthButton = ({ url, children }) => {
  return (
    <a
      href={url}
    >{children}
    </a>
  );
};

export default OauthButton
