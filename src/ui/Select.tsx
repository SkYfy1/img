import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function BasicSelect({ pron, change }: {pron: any, change: (e: SelectChangeEvent<any>) => void}) {
    

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Pronunciation</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={pron}
                    label="Pronunciation"
                    onChange={change}
                >
                    <MenuItem value={'He/Him'}>He/Him</MenuItem>
                    <MenuItem value={'She/Her'}>She/Her</MenuItem>
                    <MenuItem value={'They/Them'}>They/Them</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}