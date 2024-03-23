import React, { useState } from 'react';
import { Container, Typography, Switch, Select,MenuItem,Box, Grid, Slider, FormControlLabel, ToggleButtonGroup, ToggleButton, useTheme, Button, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const formatSliderValue = (value) => {
    if (value >= 1e9) {
        return `$${(value / 1e9).toFixed(0)}B`; 
    }
    return `$${(value / 1e6).toFixed(0)}M`;
};

const ScreeningTool = () => {
    const theme = useTheme();
    const [filters, setFilters] = useState({
        region: { active: false, options: ["EMEA", "APAC", "AMER"], selected: [] },
        subRegion: { active: false, options: ["Northeast", "Midwest", "South"], selected: [] },
        sector: { active: false, options: ["Technology", "Healthcare", "Finance"], selected: [] },
        industry: { active: false, options: ["Software", "Pharmaceuticals", "Banking"], selected: [] },
        marketCap: { active: false, value: [300000000, 50000000000] },
    });

    const handleSwitchChange = (filter) => (event) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filter]: { ...prevFilters[filter], active: event.target.checked }
        }));
    };

    const handleSelectionChange = (filter) => (event, newSelection) => {
        if (filters[filter].active) {
            setFilters(prevFilters => ({
                ...prevFilters,
                [filter]: { ...prevFilters[filter], selected: newSelection }
            }));
        }
    };

    const handleSliderChange = (event, newValue) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            marketCap: { ...prevFilters.marketCap, value: newValue }
        }));
    };

    return (
        <Container sx={{ margin: theme.spacing(2) }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: theme.spacing(3) }}>
                Screening Tool
            </Typography>
            <Typography variant="h6" component="h2" sx={{ mb: theme.spacing(2)}}>Filter by</Typography>
            {Object.entries(filters).map(([filterName, filterData]) => (
                filterName !== 'marketCap' ? (
                    <Grid container alignItems="center" spacing={2} key={filterName} >
                        <Grid item xs={2}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={filterData.active}
                                        onChange={handleSwitchChange(filterName)}
                                    />
                                }
                                label={filterName === 'subRegion'? 'Sub-Region' : filterName.charAt(0).toUpperCase() + filterName.slice(1)}
                                sx={{ mr: theme.spacing(1) }}
                            />
                        </Grid>
                        <Grid item xs={10} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <ToggleButtonGroup
                                value={filterData.selected}
                                aria-label={filterName}
                                size="small"
                                onChange={handleSelectionChange(filterName)}
                                sx={{ display: 'flex', flexGrow: 1 }}
                            >
                                {filterData.options.map((item) => (
                                    <ToggleButton key={item} value={item} disabled={!filterData.active} sx={{ flexGrow: 1, m: 0.5, justifyContent: 'center' }}>
                                        {item}
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container alignItems="center" spacing={2} key={filterName} sx={{ mb: 2 }}>
                        <Grid item xs={2.13}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={filterData.active}
                                        onChange={handleSwitchChange(filterName)}
                                    />
                                }
                                label="Market Cap"
                            />
                        </Grid>
                        <Grid item xs>
                            <Slider
                                value={filterData.value}
                                onChange={handleSliderChange}
                                valueLabelDisplay="auto"
                                valueLabelFormat={formatSliderValue}
                                min={300000000}
                                max={50000000000}
                                aria-labelledby="market-cap-slider"
                                disabled={!filterData.active}
                            />
                        </Grid>
                    </Grid>
                )
            ))}
         <Button variant="contained" color="primary">
                Search
            </Button>
            
           < MetricToggleButton />
        
            
            <Paper sx={{ marginTop: theme.spacing(3), width: '100%', overflowX: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ticker</TableCell>
                            <TableCell>Company Name</TableCell>
                            <TableCell>Exchange</TableCell>
                            <TableCell>EPS Growth</TableCell>
                            <TableCell>ROIC</TableCell>
                            <TableCell>Debt-To-Equity Ratio</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Need to populate with table results */}
                    </TableBody>
                </Table>
            </Paper>  
        </Container>
    );
};
const MetricToggleButton = () => {
    const theme = useTheme();
    const [selectedMetric, setSelectedMetric] = useState('');
    const [value, setValue] = useState('');

    const handleMetricChange = (event) => {
        setSelectedMetric(event.target.value);
        setValue('none'); // Reset value to 'none' whenever the metric changes
    };

    const handleValueChange = (event, newValue) => {
        if (newValue !== null) { // Prevent no selection
            setValue(newValue);
        }
    };

    const metrics = [
        { name: 'Select Metric', key: '' },
        { name: 'EPS Growth', key: 'epsGrowth' },
        { name: 'ROIC', key: 'roic' },
        { name: 'DTE Growth', key: 'dteGrowth' },
        { name: 'None', key: 'none' },
    ];

    const options = ['Mean', 'Median'];

    return (
        <div>
            <Container sx={{ margin: theme.spacing(2) }}>
                <Typography variant="h6" component="div" sx={{ marginBottom: theme.spacing(2) }}>
                    Select Metric and Value
                </Typography>
                {/* Dropdown Menu for Metric Selection */}
                <Box display="flex" alignItems="center">
                <Select
                    value={selectedMetric}
                    onChange={handleMetricChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Select Metric' }}
                    sx={{ minWidth: 120, marginRight: theme.spacing(2) }}
                >
                    {metrics.map((metric) => (
                        <MenuItem key={metric.key} value={metric.key}>
                            {metric.name}
                        </MenuItem>
                    ))}
                </Select>

                {/* Toggle Buttons for Mean and Median - shown only if a specific metric is selected */}
                {selectedMetric && selectedMetric !== 'none' && (
                    <ToggleButtonGroup
                        value={value}
                        exclusive
                        onChange={handleValueChange}
                        size="small"
                        sx={{ display: 'flex' }}
                    >
                        {options.map((option) => (
                            <ToggleButton key={option} value={option.toLowerCase()} sx={{ flexGrow: 1, m: 0.5, justifyContent: 'center' }}>
                                {option}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                
                )}
                </Box>
            </Container>
        </div>
    );
};
  

export default ScreeningTool;
