import { Image, Title, Flex, Box } from "@mantine/core";
import { FC } from "react";
import octane from "../../assets/octane.png";
import { Link } from "react-router-dom";

export const Sidebar: FC = () => {

  return (
    <Box mt="md" py="lg" sx={{padding:'20px 20px'}}>
      <Flex align="center" pb="1rem">
        <Image
          maw={240}
          mx="xs"
          width="25"
          height="25"
          radius="md"
          src={octane}
          alt="file image"
        />
        <Title order={5}>Octane Dashboard</Title>
      </Flex>
      <Box  bg="#fff" sx={{ display:'block'}}>
            <Link to='/orders' style={{textDecoration:'none'}}><h5 style={{ textDecoration:'none', color:'#000000'}}>Orders</h5></Link>
      </Box>
      <Box>
      <Link to='/users' style={{textDecoration:'none'}} ><h5 style={{ textDecoration:'none', color:'#000000'}}>Users</h5> </Link>
      </Box>
    </Box>
  );
};
