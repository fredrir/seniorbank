interface Props {
  title: string;
}

const SubHeaderText = ({ title }: Props) => {
  return (
    <h2 className="text-5xl font-bold mb-8 text-seniorBankDarkBlue">{title}</h2>
  );
};

export default SubHeaderText;
