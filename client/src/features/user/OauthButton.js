const OauthButton = ({ url, children }) => {
  return (
    <a style={{display: "inherit"}}
      href={url}
    >{children}
    </a>
  );
};

export default OauthButton
