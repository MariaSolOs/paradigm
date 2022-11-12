import useStyles from './MikroForm.styles';
import { ProgrammingLanguages } from '@paradeigma/graphql';
import type { ProgrammingLanguage } from '@paradeigma/graphql';
import type { FC } from 'react';
import type { MikroFormProps } from './index';

import { Select, Textarea, TextInput } from '@mantine/core';
import { IconAlphabetGreek, IconBulb } from '@tabler/icons';
import LanguageSelectItem from 'components/LanguageSelectItem';

const MikroForm: FC<MikroFormProps> = (props) => {
    const { classes } = useStyles();

    return (
        <div className={classes.form}>
            <div>
                <TextInput
                    required
                    value={props.name}
                    onChange={(event) => props.onNameChange(event.target.value)}
                    placeholder="Baptize your mikro."
                    label={
                        <>
                            <IconBulb size={20} /> Name it like a variable: Keep it short, but self-explanatory.
                        </>
                    }
                    classNames={{
                        root: classes.inputRoot,
                        label: classes.label
                    }}
                />
                <Textarea
                    required
                    value={props.description}
                    onChange={(event) => props.onDescriptionChange(event.target.value)}
                    placeholder="What is your mikro about?"
                    minRows={3}
                    maxRows={3}
                    label={
                        <>
                            <IconBulb size={20} /> As with good docs, a complete description is always appreciated.
                        </>
                    }
                    classNames={{
                        root: classes.inputRoot,
                        label: classes.label
                    }}
                />
                <Select
                    value={props.language}
                    onChange={(value) => props.onLanguageChange(value as ProgrammingLanguage)}
                    data={ProgrammingLanguages}
                    itemComponent={LanguageSelectItem}
                    label={
                        <>
                            <IconAlphabetGreek size={20} /> Which programming language are you using?
                        </>
                    }
                    placeholder="Choose your weapon."
                    classNames={{
                        root: classes.inputRoot,
                        label: classes.label
                    }}
                />
            </div>
        </div>
    );
};

export default MikroForm;
