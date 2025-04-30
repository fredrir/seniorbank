interface Props {
  title: string;
  id?: string;
}

const SubHeading = ({ title, id }: Props) => {
  return (
    <h2 id={id} className="mb-8 text-5xl font-bold text-seniorBankDarkBlue">
      {title}
    </h2>
  );
};

export default SubHeading;
