import React from 'react'
import CreateUser from '../../create/page'

const UpdateUserWithId = ({ params }: {
    params: { userId: string }
}) => {
    return (
        // <div>UpdateUserWithId : {params.userId}</div>
        <CreateUser userId={params.userId}/>
    )
}

export default UpdateUserWithId