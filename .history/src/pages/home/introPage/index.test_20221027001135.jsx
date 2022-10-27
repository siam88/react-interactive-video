import React from 'react';
import {screen,render} from '@testing-library/react';
import IntroPage from './index';

test("static content check",()=>{
    render(<IntroPage/>)
    const linkElement=screen.getByText(/স্লাইড করে/i)
    expect(linkElement).toBeInTheDocument()
})
