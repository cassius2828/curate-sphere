export const ArtInfoItem = ({ content, label }) => {
  // handle people label differently than rest
  if (label === "People" && content !== "N/A") {
    return (
      <div>
        <h3 data-cy="art-detail-people-label" className="text-gray-500 text-2xl font-semibold mt-5">{label}</h3>
        <ul data-cy="art-detail-people-content">
          {content?.map((person) => (
            <li className="mb-2 text-2xl" key={person?.personid}>
              {person?.role}: {person?.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  // any other label
  return (
    <div>
      <h3 data-cy="art-detail-other-label" className="text-gray-500 text-2xl font-semibold mt-5">{label}</h3>
      <span data-cy="art-detail-other-content" className="text-2xl">{content}</span>
    </div>
  );
};
