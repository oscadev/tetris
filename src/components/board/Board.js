import React, {useState, useEffect} from 'react';
import './style.css'
import Piece from '../piece/Piece';
import useInterval from '../useInterval';

export const Board = (props) => {
    const [board, setBoard] = useState([]);
    const [currentPiece, setCurrentPiece] = useState(null)
    const [filled, setFilled] = useState([])
    const [started, setStarted] = useState(false);
    const [lines, setLines] = useState([])


    const shapes = ["square", "line", "t"]

    const controller = (e) => {

            console.log(e)
            if(e.key==="ArrowRight"){
                movePiece('right')

            }else if(e.key==="ArrowLeft"){
                movePiece('left')

            }else if(e.key==="ArrowDown"){
                movePiece('down')
            }

    }

    const removeController = () => {
        document.removeEventListener("keydown")
    }


    const makeLines = (walls) => {
        console.log("WALLS IS:", walls)
        let arrOfArrs = []
        let line = []

        for(let i = 0; i<props.size[0]*props.size[1]; i++){
            
            if(walls.includes(i)){
                
                if(i% 2 !== 0){
                    arrOfArrs.push(line)
                }
                line = []
            }else{
                line.push(i)
            }
        }
        let clipped = arrOfArrs.splice(0,props.size[1]-1)
        console.log("my lines",clipped)
        setLines(clipped)

    }

    const checkLines = () => {
        console.log("Checked lines 1: Filled is", filled)
        let linesToDelete = []

        lines.forEach((lineArr, i) => {
            let shouldPush = true
            lineArr.forEach(i=>{
                if(filled.includes(i)){
                    
                }else{
                    shouldPush = false
                }
            })
            if(shouldPush){
                linesToDelete.push(lineArr)
            }
        });
        console.log("Lines to delete is:  ", linesToDelete)
        if(linesToDelete.length){
            console.log("LINES RAN FOR SOME REASON", linesToDelete)
            deleteLines(linesToDelete)
            return linesToDelete
        }
        
    }

    const deleteLines = (arrOfLines) => {
        console.log("ARR OF LINES 2:", arrOfLines)
        let tempNewFilled = filled
        arrOfLines.forEach(lineArray=>{
            tempNewFilled = filled.filter(itemInFilled=>{
                return !lineArray.includes(itemInFilled)
            })
        })
        setFilled(tempNewFilled)

    }

    const makeWalls = () => {
        let tempFilled = []

        let counter = 0
        //make side walls
        for (let i = 0; i<props.size[1]; i++){
            tempFilled.push(counter)
            tempFilled.push(counter+props.size[0] - 1)
            counter += props.size[0]
            
        }
        //make floor
        counter = props.size[0] * (props.size[1] - 1) + 1
        for(let i = 0; i<=props.size[0]; i++){
            tempFilled.push(counter)
            counter++
        }
        makeLines(tempFilled)
        setFilled(tempFilled)
    }
    
    const makeGrid = (coor) => {
        let temp = [];
        let painted = []
        if(coor){

            painted = coor
        }
        
        for(let i = 0; i<props.size[0]*props.size[1]; i++){
            let color;
            if(painted.includes(i)){
                color = "green"
            }
            if(filled.includes(i)){
                color="black"
            }
            temp.push(
                <div className="square" style={{backgroundColor:color}} key={i}>
                    {i}
                </div>
            )
        }
        setBoard(temp);
    }

    const pieceEnds = () => {
        console.log("ENDED")

        setFilled([...filled, ...currentPiece.position()])
    }

    useEffect(()=>{
        
        makeWalls()
        makeGrid()
        addPiece()


        

        

    },[])

    const addPiece = () => {
        let ran = Math.floor(Math.random() * shapes.length)


        const piece1 = new Piece(shapes[ran])
        setCurrentPiece(piece1)

    }

    const movePiece = (dir) => {

        
        if(currentPiece.canMove(dir, filled)){
            currentPiece.move(dir)
            makeGrid(currentPiece.position()) 
        }else{
            if(dir==="down"){
                
                pieceEnds()
                
                addPiece()
                
               
            }
        }
        
        
    }



    useEffect(()=>{

        checkLines()
        makeGrid()
    },[filled])

    useEffect(()=>{
        if(currentPiece){
           makeGrid(currentPiece.position())
           setStarted(true)
}
        
        



    },[currentPiece])

    useInterval(()=>{
        movePiece('down')
    }, 1000)

    useEffect(()=>{
        if(started){
           
        }
    },[started])



    return (
        <div id={"board"} style={{width:`${props.size[0] * 32 + (props.size[0]*3)}px`}}>
            {board}
            <button onClick={()=>addPiece()}>Start</button>

            <button onClick={()=>movePiece('down')}>Move Down</button>
            <button onClick={()=>movePiece('left')}>Move Left</button>
            <button onClick={()=>movePiece('right')}>Move Right</button>
            
            <button onClick={()=>movePiece('stop')}>stop</button>
        </div>
    )
}
