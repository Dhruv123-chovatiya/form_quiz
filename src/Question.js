import { Box } from '@mui/material';
import React, { useState } from 'react';
import { mdiCloseOutline, mdiPlusOutline } from '@mdi/js';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import Checkbox from '@mui/material/Checkbox';
import Icon from '@mdi/react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const Question = () => {
    const [cards, setCards] = useState([]);
    const [rows, setRows] = useState([]);
    const [choice, setChoice] = useState('');
    const [newQuestion, setNewQuestion] = useState({
        question: {
            text: '',
            type: 'multipleChoice',
            selectedOption: '',
            shortAnswerResponse: '',
        },
        option: [],
    });

    const handleCheckboxChange = (event, index) => {
        const options = [...newQuestion.option];
        options[index].selected = event.target.checked;
        setNewQuestion({
            ...newQuestion,
            option: options,
        });
    };

    const handleOptionTextChange = (event, index) => {
        const options = [...newQuestion.option];
        options[index].text = event.target.value;
        setNewQuestion({
            ...newQuestion,
            option: options,
        });
    };

    const handleOnChange = (event) => {
        const selectedChoice = event.target.value;
        setChoice(selectedChoice);

        // Reset rows when the choice changes
        setRows([]);

        // Handle visibility of checkbox and radio sections
        if (selectedChoice === 'Checkbox') {
            setRows([...rows, { id: Date.now(), isVisible: true }]);
        }
    };

    const addCard = () => {
        setCards([...cards, { id: Date.now(), isVisible: true }]);
    };

    const removeCard = (id) => {
        setCards(cards.map((card) => (card.id === id ? { ...card, isVisible: false } : card)));
    };

    const toggleRowVisibility = (id) => {
        setRows(rows.map((row) => (row.id === id ? { ...row, isVisible: !row.isVisible } : row)));
    };

    const addRow = () => {
        setRows([...rows, { id: Date.now(), isVisible: true }]);
    };

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <Box>
            <Box align={'center'} sx={{ mt: 4 }}>
                <Button variant="contained"> Builder </Button>
                <Button variant="contained" sx={{ ml: 3 }}>
                    preview
                </Button>
            </Box>
            <Box>
                <Box sx={{ '& > :not(style)': { m: 1, mt: 9, ml: 10 } }}>
                    <Fab color="primary" aria-label="add" onClick={addCard}>
                        <AddIcon />
                    </Fab>
                </Box>
            </Box>
            <Box sx={{ ml: 40, mr: 40, mt: 9 }}>
                {cards.map((card) => (
                    card.isVisible && (
                        <Card key={card.id} sx={{ minWidth: 275 }}>
                            <ToggleButton sx={{ ml: 96, mt: 2, bgcolor: 'red' }} onClick={() => removeCard(card.id)}>
                                <Icon path={mdiCloseOutline} size={1} />
                            </ToggleButton>


                            <CardContent>
                                <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                    <b> Question :</b>
                                    <TextField sx={{ mt: 1 }} multiline maxRows={4} fullWidth />
                                </Typography>
                                <Typography sx={{ fontSize: 20, mt: 3 }} color="text.secondary">
                                    <b>Question type :</b>
                                    <Box sx={{ minWidth: 120, mt: 1 }}>
                                        <FormControl fullWidth>
                                            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={choice} onChange={handleOnChange}>
                                                <MenuItem value={'Multiple Choice'}> Multiple Choice </MenuItem>
                                                <MenuItem value={'Checkbox'}> Checkbox </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    {choice === 'Multiple Choice' && (
                                        <Box>
                                            {/* Radio button section */}
                                            <Box>
                                                {rows.map((row) => (
                                                    row.isVisible && (
                                                        <Box key={row.id}>
                                                            <FormControl>
                                                                <RadioGroup
                                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                                    defaultValue="female"
                                                                    name="radio-buttons-group"
                                                                >
                                                                    <FormControlLabel value="" control={<Radio />} sx={{ mt: 2.5 }} />
                                                                </RadioGroup>
                                                            </FormControl>
                                                            <TextField sx={{ mt: 2 }} multiline maxRows={4} />
                                                            <ToggleButton sx={{ mt: 2, ml: 2, bgcolor: 'red' }} onClick={() => toggleRowVisibility(row.id)}>
                                                                <Icon path={mdiCloseOutline} size={1.4} />
                                                            </ToggleButton>
                                                        </Box>
                                                    )
                                                ))}
                                                <Box>
                                                    <ToggleButton sx={{ mt: 2, ml: 31.4, bgcolor: 'grey' }} onClick={addRow}>
                                                        <Icon path={mdiPlusOutline} size={1.4} />
                                                    </ToggleButton>
                                                </Box>
                                            </Box>
                                        </Box>
                                    )}

                                    {choice === 'Checkbox' && (
                                        <Box>
                                            {rows.map((row) => (
                                                row.isVisible && (
                                                    <Box key={row.id}>
                                                        <FormControl>
                                                            {newQuestion.option.map((option, index) => (
                                                                <FormControlLabel
                                                                    key={index}
                                                                    control={
                                                                        <Checkbox
                                                                            checked={option.selected}
                                                                            onChange={(e) => handleCheckboxChange(e, index)}
                                                                        />
                                                                    }
                                                                    label={
                                                                        <TextField
                                                                            multiline
                                                                            maxRows={4}
                                                                            value={option.text}
                                                                            onChange={(e) => handleOptionTextChange(e, index)}
                                                                        />
                                                                    }
                                                                />
                                                            ))}
                                                        </FormControl>
                                                        <ToggleButton sx={{ mt: 2, ml: 2, bgcolor: 'red' }} onClick={() => toggleRowVisibility(row.id)}>
                                                            <Icon path={mdiCloseOutline} size={1.4} />
                                                        </ToggleButton>
                                                        <ToggleButton sx={{ mt: 2, ml: 30.7, bgcolor: 'grey' }} onClick={addRow}>
                                                            <Icon path={mdiPlusOutline} size={1.4} />
                                                        </ToggleButton>
                                                    </Box>
                                                )
                                            ))}
                                        </Box>
                                    )}

                                </Typography>
                            </CardContent>
                        </Card>
                    )
                ))}
            </Box>
        </Box>
    );
};

export default Question;
