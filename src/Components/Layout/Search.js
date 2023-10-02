import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { ApiGateWay } from './../ApiGateWay/ApiGateWay';
import PieChart from "../Charts/PieChart";
import DoughnutChart from "../Charts/Doughnut";
import LineChart from "../Charts/LineChart";
import DataGrid from "../DataGrid/DataGrid";
import BarChart from "../Charts/BarChart";
import RadarChart from "../Charts/RadarChart";
import Spinner from "../Layout/Spinner/Spinner";




function Search() {
    const [data, setData] = useState("");
    const [cols, setCols] = useState("");
    const [main, setMain] = useState(true);


    const [box,setBox]=useState("")
    const [search, setSearch] = useState("");
    const [layout,setLayout]=useState(false)
    const [rs,setRs]=useState("")
    const [ss,setSs]=useState("")
    const [cs,setCs]=useState("")
    const [nsales,setNsales]=useState("")
    const [ptop,setPtop]=useState("")
    const [stop,setStop]=useState("")
    const [ctop,setCtop]=useState("")
    const [load,setLoad]=useState(false)
    const [pivot,setPivot]=useState("")
    const [yoopiq,setYoopiq]=useState(false)
    const [line,setLine]=useState(false)
    const [bar,setBar]=useState(false)
    const [pie,setPie]=useState(false)
    const [dataU,setDatau]=useState("")
    const [sp,setSp]=useState(false)
    const [randomn,setRandomNumber]=useState("Sit back and relax, I will take care of the rest")
  const msg = new SpeechSynthesisUtterance()
  

  const speechHandler = (msg) => {
    msg.text = randomn
    window.speechSynthesis.speak(msg)
  }


    const reply= ["I am generating answers, Please give me some time","Sit back and relax, I will take care of the rest","Don't go anywhere, I'm almost done with your request","You're awesome for choosing us, I'll be right back with your results","Hang in there, I'm crunching the numbers for you"," No need to worry, I'm on the case","You deserve the best, that's why I'm taking my time"];

    const generateRandomNumber = () => {
        const randomNumber = Math.floor(Math.random() * reply.length);
        setRandomNumber(reply[randomNumber])
    }

    const undo = (event) => {
        event.preventDefault();
        setSearch("")


    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setLayout(false)
        setYoopiq(false)
        setBar(false)
        setPie(false)

        setLine(false)


        setLoad(true)
        generateRandomNumber()
        console.log(randomn)



        ApiGateWay.Post('/api/model/predict', { "text": search }).then(response => response.json()).then(response => {
            if (response['success'] ==='failed'){
                setYoopiq(true)
                setLoad(false)


            }

            else{
            setMain(false)
            setData(JSON.parse(response['success']))
            setCols(response['cols'])
            setDatau(response['user_split'])
            setBox(response['layout'])
            setRs(response['layout']['region_split'])
            setSs(response['layout']['segment_split'])
            setCs(response['layout']['cat_split'])
            setNsales(response['layout']['sales_split'])
            setPtop(response['layout']['top_split'])
            setStop(response['layout']['state_split'])
            setCtop(response['layout']['city_split'])
            setLayout(true)
            setLoad(false)
            }

            if (response['cols'].length ==2){
                if (response['type'] == 'line'){
                setBar(false)
                setPie(false)

                setLine(true)
                
                setDatau(response['user_split'])
                }

               else  if (response['type'] == 'bar'){
                    setLine(false)
                    setPie(false)
    
                    setBar(true)    
                        setDatau(response['user_split'])
                    }
                    else  if (response['type'] == 'pie'){
                        setLine(false)
        
                        setBar(false)   
                        setPie(true)
                        setDatau(response['user_split'])

 
                    }
    
            }
        

            const timeId = setTimeout(() => {
                // After 3 seconds set the show value to false
                setYoopiq(false)
              }, 5000)


              

            





        })
        .catch ((error) => {
            alert('Server response failed')
            setLoad(false)
            
          });
       
        // ApiGateWay.Get('/api/model/pivot').then(response => response.json()).then(response => {
        //     setLayout(false)
        //     setLoad(true)
        //     setPivot(response['Success'])
        //     setLayout(true)
        //     setLoad(false)


        // })



    }

    const [message, setMessage] = useState('');
    const commands = [
        {
            command: 'reset',
            callback: () => resetTranscript()
        },
      
    ]
    const {
        transcript,
        interimTranscript,
        finalTranscript,
        resetTranscript,
        listening,
    } = useSpeechRecognition({ commands });

    useEffect(() => {
        setSearch(finalTranscript)
        if (finalTranscript !== '') {
            console.log('Got final result:', finalTranscript);
        }
    }, [, finalTranscript]);
    
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        localStorage.setItem('mic',"false")
    }
    const listenContinuously = (event) => {
        event.preventDefault()
        SpeechRecognition.startListening({
            continuous: false,
            language: 'en-GB',
        });
    };
    
    
    return (
        
        <div>
              {yoopiq?<center><div className="alert alert-danger" style={{width:"80%"}} role="alert">
  Please try a different statement!
</div></center>:""}
{localStorage.getItem('mic')=="false"?<center><div className="alert alert-danger" style={{width:"80%"}} role="alert">
Your browser does not support YoopIQ's voice functionality! Try Chrome desktop, maybe?
</div></center>:""}
            <div className="container searchCon">

            {load? <Spinner />:""}
          
                <br />
                <h4 className="title">Your Realtime AI Analyst !!! - Speak/Type and Analyze</h4>


               
                <form action="#" className="loginForm">
                    <div>
                        <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} className="searchTerm LoginInput" placeholder="What are you looking for?"  />
                        &nbsp;&nbsp;
                        {/* <button disabled={!search} className="searchButton2" onClick={(event)=>{handleSubmit();speechHandler(msg);}}> Click to Analyze 
                        </button>
                        &nbsp;&nbsp; */}
                        <button disabled={!search} className="searchButton2" onClick={handleSubmit}> Click to Analyze 
                        </button>   
                        &nbsp;&nbsp;
                        {localStorage.getItem('mic')=="false"?"":<button className="searchButton" onClick={listenContinuously}>        <i className="fa fa-microphone"></i>

                        </button>}
                        &nbsp;&nbsp;
                        <button className="searchButton" onClick={undo}>        <i className="fa fa-undo"></i>

                        </button>




                    </div>


                </form>


            </div>
            <br />
{layout?<div className="container-fluid">
<button type="button" className="rib btn btn-success ribbon">Auto Pilot Mode</button>    



</div>:""}
            <div className="container-fluid">
            {main?<div>

                <h4 className="mainTitle animation1">A Simple Question is all you need to analyze now</h4>
                    <br />
                    <h4 className="mainTitle animation2">Just Speak with the yoopIQ AI Bot and relax</h4>
                    <br />
                    
                    <h4 className="mainTitle animation4">AI powered Voice based Dashboards</h4>
                    <br />
                    <h4 className="mainTitle animation3">One Stop Solution for all your business decisions</h4>
                    <br />
                    <h4 className="mainTitle animation5">Let's Stop wasting time in generating Charts & Insights</h4>



                    </div>:""}
                {layout?
                
                <div className="row">

                    <div className="col">
                        <div className="card bg-primary text-white h-100">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="me-3">
                                        <div className="text-white-75 small">{box['metric']} ( Last Month)</div>
                                        <div className="text-lg fw-bold">{box.lm}</div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-calendar feather-xl text-white-50"><rect x={3} y={4} width={18} height={18} rx={2} ry={2} /><line x1={16} y1={2} x2={16} y2={6} /><line x1={8} y1={2} x2={8} y2={6} /><line x1={3} y1={10} x2={21} y2={10} /></svg>
                                </div>
                            </div>

                        </div>




                    </div>
                    <div className="col">
                        <div className="card bg-success text-white h-100">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="me-3">
                                        <div className="text-white-75 small">{box['metric']} (Current Month)</div>
                                        <div className="text-lg fw-bold">{box.cm}</div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-calendar feather-xl text-white-50"><rect x={3} y={4} width={18} height={18} rx={2} ry={2} /><line x1={16} y1={2} x2={16} y2={6} /><line x1={8} y1={2} x2={8} y2={6} /><line x1={3} y1={10} x2={21} y2={10} /></svg>
                                </div>
                            </div>

                        </div>




                    </div>
                    <div className="col">
                        <div className="card bg-warning text-white h-100">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="me-3">
                                        <div className="text-white-75 small">{box['metric']} (Last Week)</div>
                                        <div className="text-lg fw-bold">{box.lw}</div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-calendar feather-xl text-white-50"><rect x={3} y={4} width={18} height={18} rx={2} ry={2} /><line x1={16} y1={2} x2={16} y2={6} /><line x1={8} y1={2} x2={8} y2={6} /><line x1={3} y1={10} x2={21} y2={10} /></svg>
                                </div>
                            </div>

                        </div>




                    </div>
                    <div className="col">
                        <div className="card bg-danger text-white h-100">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="me-3">
                                        <div className="text-white-75 small">{box['metric']} (Current Week)</div>
                                        <div className="text-lg fw-bold">{box.cw}</div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-calendar feather-xl text-white-50"><rect x={3} y={4} width={18} height={18} rx={2} ry={2} /><line x1={16} y1={2} x2={16} y2={6} /><line x1={8} y1={2} x2={8} y2={6} /><line x1={3} y1={10} x2={21} y2={10} /></svg>
                                </div>
                            </div>

                        </div>




                    </div>

                </div>:""}
            </div>
            <br />
            {layout?<div className="container-fluid">
                <div className="row">
                    <div className="col">  <div className="card text-white h-100">
                            <div className="card-body">
                                <center>
                                <LineChart title={"Day Wise "+box['metric']} lables={nsales['labels']} values={nsales['values'] } />
                            </center>

                                
                            </div>

                        </div>
                        </div>
                   
              
            </div>

            </div>:""}
            <br />
            {layout?<div className="container-fluid">
                <div className="row">
                
                    <div className="col layoutCf">
                        <div className="card text-white h-100">
                            <div className="card-body">
                                <center>
                            <PieChart  title={"Region Wise Split (%)"} lables={rs['labels']} values={rs.percentage }/>
                            </center>

                                
                            </div>

                        </div>




                    </div>
                    <div className="col">
                        <div className="card text-white h-100">
                            <div className="card-body">
                            <center>
                                
                            <DoughnutChart  title={"Segment Wise Split (%)"} lables={ss['labels']} values={ss.percentage }/>
                            </center>

                                
                            </div>

                        </div>




                    </div>
                    <div className="col layoutCf">
                        <div className="card text-white h-100">
                            <div className="card-body">
                            <center>
                            <PieChart  title={"Category Wise Split (%)"} lables={cs['labels']} values={cs.percentage }/>
                            </center>

                                
                            </div>

                        </div>




                    </div>


                </div>



            </div>:""}

<br />
{layout?<div className="container-fluid">
                <div className="row">
                
                    <div className="col layoutCf">
                        <div className="card text-white h-100">
                            <div className="card-body">
                                <center>
                            <RadarChart  title={"Top 7 States"} lables={stop['labels']} values={stop.values } bg={"rgba(255, 99, 132)"} border={"rgba(255, 99, 132,0.5)"} />
                            </center>

                                
                            </div>

                        </div>




                    </div>
                    <div className="col">
                        <div className="card text-white h-100">
                            <div className="card-body">
                            <center>
                                
                            <RadarChart  title={"Top 7 Cities"} lables={ctop['labels']} values={ctop.values } bg={"rgba(53, 162, 235)"} border={"rgba(53, 162, 235,0.5)"} />
                            </center>

                                
                            </div>

                        </div>




                    </div>
                  

                </div>



            </div>:""}
            <br />
            {layout?<div className="container-fluid">
                <div className="row">
                    <div className="col">  <div className="card text-white h-100">
                            <div className="card-body">
                                <center>
                                <BarChart title={"Top 10 Products by "+box['metric']} lables={ptop['labels']} values={ptop['values'] } />
                            </center>

                                
                            </div>

                        </div>
                        </div>
                   
              
            </div>

            </div>:""}
            <br />
           {layout? <button type="button" className="rib btn btn-primary ribbon">Your results</button>  :""}  

            {line?<div className="container-fluid">
            <div className="card text-white h-100">

                            <div className="card-body">
                            <center>
                            <LineChart title={box['metric']} lables={dataU['labels']} values={dataU['values'] } />
                            </center>

                                
                            </div>

                        </div>


            </div>:""}
            <br />
            {bar?<div className="container-fluid">
            <div className="card text-white h-100">

                            <div className="card-body">
                            <center>
                            <BarChart title={box['metric']} lables={dataU['labels']} values={dataU['values'] } />

                            </center>

                                
                            </div>

                        </div>


            </div>:""}
            <br />
            {pie?<div className="container-fluid">
            <div className="card text-white h-100">

                            <div className="card-body">
                            <center>
                                                        <DoughnutChart  title={"% Contribution)"} lables={dataU['labels']} values={dataU['values'] }/>

                            </center>

                                
                            </div>

                        </div>


            </div>:""}
            <br />

            {layout?<div className="container-fluid">
            <div className="card text-white h-100">

                            <div className="card-body">
                            <center>
                            <DataGrid columnData={data} header={cols}/>
                            </center>

                                
                            </div>

                        </div>


            </div>:""}

            {/* {layout?<div className="container-fluid">
            <div className="card text-white h-100">
                            <div className="card-body">
                            <center>
                            <Pivot data={pivot}/>  
                            </center>

                                
                            </div>

                        </div>


            </div>:""} */}

        </div>

    )


}

export default Search;