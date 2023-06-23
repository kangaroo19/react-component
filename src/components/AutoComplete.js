import styled from "styled-components"
import { useEffect, useState, useRef } from "react"
import { dataArr } from "../data/datalist"

export default function AutoComplete(){
    const [text,setText]=useState("")
    const [result,setResult]=useState([])
    const inputRef = useRef(null);
    const onChange=(event)=>{
        const {target:{value}}=event
        setText(value)
    }
    const onClick=(event)=>{
        console.log('라우팅')
        event.stopPropagation()
        const {target:{innerText}}=event
        setText(innerText)
        setResult([])
        //return 이후 라우팅처리
    }
    const keyDown = (event) => { //화살표 방향키 입력시 검색어 바뀌는 기능 좀 더 생각해 봐야 할 듯
        // if (event.key === 'ArrowDown'){
        //     let idx=0
        //     AutoInput.innerText='123'
        //     idx++
        // }
        // else if (event.key==='ArrowUp'){

        // }
      };
    useEffect(()=>{
        if(!text) return setResult([])
        const res=dataArr.filter(value=>value.name.includes(text))
        setResult(res)
    },[text])

    // const isInputFocused = () => {
    //     if (inputRef.current === document.activeElement) {
    //     } else { //unfocus
    //       setText("")
    //     }
    //   };
    
    return (
        <Wrapper>
            <AutoInputWrapper onBlur={()=>console.log('포커스 아웃')}>
                <AutoInput ref={inputRef} type="text" value={text} onChange={onChange} placeholder="검색어를 입력해 주세요" onKeyDown={keyDown}/>
                {result.length?
                <AutoResultWrapper>
                {result.map((v,idx)=>(
                    <AutoResult key={idx} onClick={onClick}>{v.name}</AutoResult> //검색결과 나오는 부분
                ))}
                </AutoResultWrapper>:
                null}
            </AutoInputWrapper>
        </Wrapper>
    )
}

const Wrapper=styled.div`
    border:1px solid black;
`
const AutoInputWrapper=styled.div`
    
`
const AutoInput=styled.input`
    width:500px;
    height:20px;
    border-radius:15px;
`
const AutoResultWrapper=styled.div`
    width:500px;
    border:2px solid black;
    border-top:none;
`

const AutoResult=styled.div`
    widht:100px;
    height:30px;
`

