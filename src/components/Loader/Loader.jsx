import { Oval } from 'react-loader-spinner';
import { WrapStyled } from './Loader.styled';

export const Loader = () => {
  return (
    <Oval
      visible={true}
      height="80"
      width="80"
      color="#585ec2"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export const FullContainerLoader = ({
  paddingTop = null,
  paddingBottom = null,
}) => {
  return (
    <WrapStyled $paddingBottom={paddingBottom} $paddingTop={paddingTop}>
      <Loader />
    </WrapStyled>
  );
};
