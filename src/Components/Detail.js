import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import { useParams } from "react-router-dom"
import db from "../firebase"

  const Detail = (props) => {
    const { id } = useParams();
    const [detailData, setDetailData] = useState({});
  
    useEffect(() => {
      db.collection("movies")
        .doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setDetailData(doc.data());
          } else {
            console.log("no such document in firebase 🔥");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }, [id]);
    return (
        <Container>
            <Background>
          <img alt={detailData.title} src={detailData.backgroundImg} />
        </Background>
  
        <ImageTitle>
          <img alt={detailData.title} src={detailData.titleImg} />
        </ImageTitle>
            <Controls>
                <PlayButton>
                    <img src="/images/play-icon-black.png"/>
                    <span>PLAY</span>
                </PlayButton>
                <TrailerButton>
                    <img src="/images/play-icon-white.png"/>
                    <span>TRAILER</span>
                </TrailerButton>
                <AddButton>
                    <span>+</span>
                </AddButton>
                <GroupWatchButton>
                    <img src="/images/group-icon.png"/>
                </GroupWatchButton>
            </Controls>
            <SubTitle>{detailData.subTitle}</SubTitle>
          <Description>{detailData.description}</Description>
        </Container>
    )
}

export default Detail

const Container =styled.div`
    min-height: calc(100vh- 70px);
    padding: 0 calc(3.5vw + 5px);
    position:relative;
`
const Background =styled.div`
    position: fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
    z-index: -1;
    opacity: 0.8;
    img{
       width:100%;
       height:100%;
       object-fit: cover; 
    }
`
const ImageTitle = styled.div`
         height:337px; 
        //  height:30vh
        min-height:170px;
        margin-top:150px;
        width:35vw;
        min-width:200px;
        img{
            width:100%;
            height:100%;
            object-fit:contain;
        }
`
const Controls=styled.div`
    display:flex;
    align-items:center;
`
const PlayButton=styled.button`
    border-radius:4px;
    height:56px;
    margin-right:22px;
    font-size:15px;
    padding:0px 24px;
    display:flex;
    align-items:center;
    background:rgb(249,249,249);
    border:none;
    letter-spacing: 1.8px;
    cursor:pointer;

    &:hover{
        background: rgb(198,198,198);
    }
`
const TrailerButton=styled(PlayButton)`
    background: rgba(0,0,0,0.3);
    border:1px solid rgb(249,249,249);
    color: rgb(249,249,249);
    text-transform:uppercase;
`
const AddButton=styled.button`
    margin-right:16px;
    height:44px;
    width:44px;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius: 50%;
    border:2px solid white;
    background-color: rgba(0,0,0,0.6);
    cursor:pointer;
    span{
        font-size:30px;
        color:white;
    }
`
const GroupWatchButton=styled(AddButton)`
    background-color:rgb(0,0,0);
`
const SubTitle = styled.div`
  margin-top:25px;
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Description = styled.div`
  line-height: 1.4;
  width:900px;
  font-size: 20px;
  padding: 16px 0px;
  color: rgb(249, 249, 249);
  word-wrap: break-word;  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;