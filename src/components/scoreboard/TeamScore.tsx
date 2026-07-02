interface Props {
  name: string;
  score: number;
  onGoal: () => void;
  onUndo?: () => void;
}

export function TeamScore({ name, score, onGoal, onUndo }: Props) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{score}</p>

      <button onClick={onGoal}>Goal</button>
      {onUndo ? <button onClick={onUndo}>Cancel goal</button> : null}
    </div>
  );
}
