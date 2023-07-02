import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green, orange } from '@mui/material/colors';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { results } from '../data/datalist'; //영화 api 호출결과값
import RecipeReviewCard from './RecipeReviewCard';
import styled from 'styled-components';

const outerTheme = createTheme({ //mui컴포넌트 theme 적용 (오렌지색), 색 적용할 컴포넌트를 ThemeProvider컴포넌트로 감싸야됨
  palette: {
    primary: {
      main: orange[500],
    },
  },
});

export default function FreeSolo() {
  
  const [text,setText]=React.useState(null)
  const [inputValue, setInputValue] = React.useState('');
  const [searchAnswer,setSearchAswer]=React.useState(null)
  const keyDown = (event) => { 
    if (event.key === 'Enter'){
        setText(event.target.value)
    }
  };
  
  
  React.useEffect(()=>{
    const resultTemp=results.filter((v)=>v.title===text)
    setSearchAswer(resultTemp[0])
  },[text])
  console.log(searchAnswer)
  
  return (
      <ThemeProvider theme={outerTheme}>
        <Grid sx={{borderRadius:'10px',margin:'0 auto',marginTop:'30px',width:'30%',padding:'15px',backgroundColor:'#eee'}}>
          <Grid container sx={{width:'90%',margin:'0 auto',boxShadow:'10'}}>
            <Grid item xs={10} sx={{backgroundColor:'white',}}>
              <Autocomplete
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue)
                }}
                onKeyDown={(event)=>keyDown(event)}
                id="free-solo-demo"
                freeSolo
                options={results.map((option) => option.title)}
                renderInput={(params) => <TextField {...params} label="검색어를 입력해 주세요" />}
                // sx={{
                //   ".css-md26zr-MuiInputBase-root-MuiOutlinedInput-root:hover": {
                //    border:'1px solid #00FF40'
                //   }
                // }}
                sx={{
                  height:'60px',
                  
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" sx={{height:'55px'}} onClick={()=>setText(inputValue)}>
                <SearchIcon fontSize='large'/>
              </Button>
            </Grid>
          </Grid>
        {/* 검색결과 */}
        {searchAnswer?
        <Grid sx={{margin:'0 auto',display:'block',width:'75%'}}>
          {/* {searchAnswer.title}
          <img src={`https://image.tmdb.org/t/p/w500/${searchAnswer.poster_path}`}  alt="" />
          <p>{searchAnswer.overview}</p> */}
          <RecipeReviewCard searchAnswer={searchAnswer}/>
        </Grid>:
        <div>검색어가 없습니다..</div>}
        </Grid>
      </ThemeProvider>
  );
}


