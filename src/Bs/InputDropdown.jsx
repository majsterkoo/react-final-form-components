import React from 'react';
import Wrap from './Wrappers/Wrap';
import decorator from '../utils/decorator';

/**
 * Dropdown item used as InputGroupButton
 */
export default decorator({ type: 'input-dropdown' })(Wrap);
