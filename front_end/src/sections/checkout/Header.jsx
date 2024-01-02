import { PatchCheckFill } from 'react-bootstrap-icons'

export const Header = ({name, verifide}) => {
    return (
        <span className='flex-group align-items-center gap-1'>
            {verifide ? <PatchCheckFill color='green' size={25}/> : ''}
            <p className='f-large fw-bold cap'>{name}</p>
        </span>
    )
}