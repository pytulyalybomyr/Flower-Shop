import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

export default function Starts({ stars }) {
    const [value, setValue] = React.useState(stars);

    return (
        <Box
            sx={{
                '& > legend': { mt: 2 },
            }}
        >
            <Rating
                name="read-only"
                value={value}
                precision={0.5}
                readOnly
            />
        </Box>
    );
}
