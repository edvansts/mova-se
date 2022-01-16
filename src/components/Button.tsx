import React, { ButtonHTMLAttributes } from 'react';
import Loader from './Loader';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
}

function Button({ loading, children, ...rest }: Props) {
    return (
        <button {...rest} disabled={rest.disabled || loading}>
            {loading ? <Loader position="center" size="2rem" /> : children}{' '}
        </button>
    );
}

export default Button;
