type Props = {
  svg: string;
  title: string;
  height: number;
  width: number;
  onClick: () => void;
};

export const MenuButton = ({ svg, title, height, width, onClick }: Props) => {
  return (
    <div className="py-4" onClick={onClick}>
      <img src={svg} alt={title} height={height} width={width} />
    </div>
  );
};
