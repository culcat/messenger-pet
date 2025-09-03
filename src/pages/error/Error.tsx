import { Button, Flex, Result } from 'antd';
import { useNavigate } from 'react-router';

export const Error = () => {
  const navigate = useNavigate();

  return (
    <Flex justify="center" align="center" style={{ height: '90vh', padding: '20px' }}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, something went wrong."
        extra={
          <Button type="primary" onClick={() => navigate('/chat')}>
            Back Home
          </Button>
        }
      />
    </Flex>
  );
};
