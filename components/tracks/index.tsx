import React from 'react'
import { Consumer } from "../../pages/tracks";
import Component from './track';

const Tracks = ({ context }: any) => {
    return (
        <div className='bg-gray-0 overscroll-contain'>
            {context.store?.tracks?.map((track: any, index: number) => <Component key={index} data={track} context={context} />
            )}
        </div>
    )
}


// wrapper for context
const Wrapper = () => <Consumer>
    {value => <Tracks context={value} />}
</Consumer>

export default Wrapper

