import React from 'react';
import {screen,render} from '@testing-library/react';
import IntroPage from './index';

test("static content check",()=>{
    render(<IntroPage/>);
    const linkElement=screen.getByText(/হটস্পটে ক্লিক করে/i);
    expect(linkElement).toBeInTheDocument()
})
