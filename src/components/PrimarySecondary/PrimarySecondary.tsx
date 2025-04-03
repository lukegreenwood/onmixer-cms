export const PrimarySecondary = ({
  primary,
  secondary,
}: {
  primary: React.ReactNode;
  secondary: React.ReactNode;
}) => {
  return (
    <div className="primary-secondary">
      <div className="primary-secondary__secondary">{secondary}</div>
      <div className="primary-secondary__primary">{primary}</div>
    </div>
  );
};
