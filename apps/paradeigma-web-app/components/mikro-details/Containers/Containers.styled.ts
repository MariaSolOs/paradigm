import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
    margin: '0 auto',
    width: '85vw',

    [theme.breakpoints.down('sm')]: { width: '95vw' }
}));

export const MainContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px auto 50px',

    [theme.breakpoints.down('md')]: { flexDirection: 'column' }
}));

export const MikroContainer = styled('div')(({ theme }) => ({
    width: '48%',
    height: 'fit-content',
    borderRadius: +theme.shape.borderRadius * 2,
    overflow: 'hidden',

    [theme.breakpoints.down('md')]: {
        width: '100%',
        marginBottom: 30,
        fontSize: '0.8rem'
    }
}));
