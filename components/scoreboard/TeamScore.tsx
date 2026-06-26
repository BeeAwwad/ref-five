interface Props {
  name: string;
  score: number;
  onGoal: () => void;
}

export function TeamScore({ name, score, onGoal }: Props) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{score}</p>

      <button onClick={onGoal}>Goal</button>
    </div>
  );
}
