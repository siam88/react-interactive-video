import {render,screen} from '@testing-library/react';
import LoginPage from './index'


describe("Login Page",()=>{
    test("render successfully",()=>{
        render(<LoginPage/>)

        const nameInpEl=screen.getByRole("textbox",{name:"Name"})
        expect(nameInpEl).toBeInTheDocument()

        const numberInpEl=screen.getByRole("numberBox")
    })
})