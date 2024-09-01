import { useContext } from "react";
import ArtworkContext from "./ArtworkContext";

const useArtworkContext = () => {
  const context = useContext(ArtworkContext);

  if (context === undefined) {
    throw new Error("useArtworkContext must be used within a ArtworkProvider");
  }

  return context;
};

export default useArtworkContext;
