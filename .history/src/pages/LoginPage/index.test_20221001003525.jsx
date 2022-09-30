import {render,screen} from '@testing-library/react';
import LoginPage from './index'


describe("Login Page",()=>{
    test("render successfully",()=>{
        render(<LoginPage/>)
    })
})