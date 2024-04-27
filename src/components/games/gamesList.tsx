import type { AllGameResponse } from "@/types/types";
import { GameCard } from "../cards/gameCard";

interface IGamesListProps {
  games: AllGameResponse["games"];
}

const GamesList: React.FC<IGamesListProps> = ({ games }) => {
  return (
    <div className="flex flex-wrap">
      {games &&
        games.map((game) => (
          <GameCard
            description={game.description}
            imgUrl={game.coverImageUrl}
            title={game.title}
            id={game.id}
            price={game.price}
            discount={game.discount}
            active={game.active}
          />
        ))}
    </div>
  );
};

export { GamesList };
