import React from 'react'
import { useEth } from '../contexts/EthContext/useEth'

function TodoList() {
    const {
        state: {contract,accounts},
    } = useEth();

    
  return (
    <>

    </>
  )
}

export default TodoList