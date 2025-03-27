import { ComponentsMap } from './getIcons';
interface IconProps {
  iconName?: string
}

const Icon:React.FC<IconProps> = ({
  iconName = ''
}) => {

  const IconComponent = ComponentsMap[iconName];

  return <IconComponent />;
};

export default Icon;
