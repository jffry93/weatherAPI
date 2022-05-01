interface Person {
  text: string;
  ok: boolean;
}

interface Props {
  text: string;
  ok: boolean;
  i: number;
  fn: (bob: string) => string;
  person: Person;
}

const Text: React.FC<Props> = ({ fn }) => {
  return <div>Text</div>;
};

export default Text;
