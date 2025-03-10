interface Props {
  title: string;
}

const HeaderText = ({ title }: Props) => {
  return <h1 className="text-7xl font-bold my-8 text-white">{title}</h1>;
};

export default HeaderText;
