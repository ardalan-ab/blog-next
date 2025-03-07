import { AppBar, Toolbar, Typography, Button, Box ,Link} from '@mui/material';


export default function Header() {
    const handleRevalidate = async () => {
        try {
            const res = await fetch('/api/revalidate', { method: 'POST' });
            if (res.ok) {
                alert('success');
            } else {
                alert('failed');
            }
        } catch (error) {
            console.error('Error during revalidate:', error);
            alert('error');
        }
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#181C14' }}>
            <Toolbar>
                <Typography variant="h4" sx={{ flexGrow: 1 }}>
                    <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    My Professional Blog
                    </Link>
                </Typography>
                <Box>
                    <Button color="inherit" onClick={handleRevalidate}>revalidate</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
   