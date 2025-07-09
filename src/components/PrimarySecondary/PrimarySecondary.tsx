export const PrimarySecondary = ({
  primary,
  secondary,
  reverse = true,
}: {
  primary: React.ReactNode;
  secondary: React.ReactNode;
  reverse?: boolean;
}) => {
  return (
    <div className="primary-secondary">
      {reverse ? (
        <>
          <div className="primary-secondary__secondary">{secondary}</div>
          <div className="primary-secondary__primary">{primary}</div>
        </>
      ) : (
        <>
          <div className="primary-secondary__primary">{primary}</div>
          <div className="primary-secondary__secondary">{secondary}</div>
        </>
      )}
    </div>
  );
};
