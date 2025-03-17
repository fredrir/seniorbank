interface Props {
  title: string;
}

const SubHeaderText = ({ title }: Props) => {
  return (
    <h2 className="mb-8 text-5xl font-bold text-seniorBankDarkBlue">{title}</h2>
  );
};

export default SubHeaderText;
