import { ArtInfoItem } from "./ArtInfoItem";

export const ArtInfoSection = ({ title, list }) => {
  return (
    <>
      <div className="flex flex-col justify-center pl-5 mt-12 items-start gap-6 md:gap-20 md:items-start md:mx-2 text-3xl font-cardo border-t-2">
        <h2 className="mt-5 mb-8">{title}</h2>
      </div>
      <ul className="pl-6">
        {list.map((item, idx) => (
          <ArtInfoItem
            key={item?.title || idx}
            label={item.label}
            content={item.content}
          />
        ))}
      </ul>
    </>
  );
};
