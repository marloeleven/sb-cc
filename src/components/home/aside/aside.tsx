import { Container, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';
import { Filter } from './filter';

// class mismatch workaround
const Sort = dynamic(() => import('./sort'), {
  ssr: false,
});

function TitleBar({ children }: PropsWithChildren) {
  return <Typography variant="h6">{children}</Typography>;
}

export function Aside() {
  return (
    <Container
      component="aside"
      sx={{
        maxWidth: {
          xs: '100%',
          sm: 306,
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 12,
      }}
    >
      <Sort>
        <TitleBar>Sort by Title</TitleBar>
      </Sort>

      <Filter>
        <TitleBar>Filter</TitleBar>
      </Filter>
    </Container>
  );
}
