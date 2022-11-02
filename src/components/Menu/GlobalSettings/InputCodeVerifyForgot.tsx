import React, { useState, useRef } from 'react'
import styled from 'styled-components'

const InputCode = ({ length, label, loading, onComplete }) => {
  const [code, setCode] = useState([...Array(length)].map(() => ''))
  const inputs = useRef([])
  // Typescript
  // useRef<(HTMLInputElement | null)[]>([])

  const processInput = (e, slot) => {
    const num = e.target.value
    if (/[^0-9]/.test(num)) return
    const newCode = [...code]
    newCode[slot] = num
    setCode(newCode)
    if (slot !== length - 1) {
      inputs.current[slot + 1].focus()
    }
    // eslint-disable-next-line @typescript-eslint/no-shadow
    if (newCode.every((num) => num !== '')) {
      onComplete(newCode.join(''))
    }
  }

  const onKeyUp = (e, slot) => {
    if (e.keyCode === 8 && !code[slot] && slot !== 0) {
      const newCode = [...code]
      newCode[slot - 1] = ''
      setCode(newCode)
      inputs.current[slot - 1].focus()
    }
  }

  return (
    <ContainerInput className="code-input">
      <Label className="code-label">{label}</Label>
      <Wrap className="code-inputs">
        {code.map((num, idx) => {
          return (
            <Input
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={num}
              autoFocus={!code[0].length && idx === 0}
              readOnly={loading}
              onChange={(e) => processInput(e, idx)}
              onKeyUp={(e) => onKeyUp(e, idx)}
              ref={(ref) => inputs.current.push(ref)}
            />
          )
        })}
      </Wrap>
    </ContainerInput>
  )
}

export default InputCode

const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`

const Wrap = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`

const Label = styled.label`
  margin-bottom: 16px;
`

const Input = styled.input``
