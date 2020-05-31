# Form
This module provides a standardized way to create and use forms.

## Module dependencies 
- `Packages/Common/FormElement`, with saga

## Usage
Following code snipped could be used in a module.
```javascript
import { createFormParameters, createFormState } from 'Packages/Common/Form';
import { createPasswordFieldState, createTextFieldState } from 'Packages/Common/FormElement';

const formState = createFormState({
    id: 'loginForm1',
    elementPresetsByName: {
        username: createTextFieldState({
            value: 'some initial username value',
        }),
        password: createPasswordFieldState(),
    },
});

const parameters = createFormParameters(formState);
console.info('These params could be sent to api:', parameters);
```