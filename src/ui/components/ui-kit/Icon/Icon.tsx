import { ComponentsMap } from './getIcons';
interface IconProps {
  iconName?: string
  className?: string
}

const Icon:React.FC<IconProps> = ({
  iconName = '',
  className = ''
}) => {

  const IconComponent = ComponentsMap[iconName];

  return <IconComponent className={className} />;
};

export default Icon;
