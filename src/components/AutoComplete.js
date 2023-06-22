import styled from "styled-components"
import { useEffect, useState } from "react"
import { dataArr } from "../data/datalist"

export default function AutoComplete(){
    const [text,setText]=useState("")
    const [result,setResult]=useState([])
    const onChange=(event)=>{
        const {target:{value}}=event
        setText(value)
    }

    useEffect(()=>{
        if(!text) return
        const res=dataArr.filter(value=>value.name.includes(text))
        setResult(res)
    },[text])
    console.log(text)
    return (
        <Wrapper>
            <AutoInput type="text" value={text} onChange={onChange}/>
            {result.length?
                <AutoResultWrapper>
                {result.map((v)=>(
                    <AutoResult>{v.name}</AutoResult>
                ))}
                </AutoResultWrapper>:
                '업서요'}
        </Wrapper>
    )
}

const Wrapper=styled.div`

`

const AutoInput=styled.input`
    width:500px;
    height:20px;
    border-radius:15px;
`
const AutoResultWrapper=styled.div`
    width:500px;
    border:2px solid black;
`

const AutoResult=styled.div`
    widht:100px;
    height:30px;
`

